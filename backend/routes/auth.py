from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models import User
from flask_jwt_extended import create_access_token
import re

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

def normalize_phone(phone):
    digits = re.sub(r'\D', '', phone)
    if digits.startswith('380') and len(digits) == 12:
        return '+' + digits
    elif digits.startswith('0') and len(digits) == 10:
        return '+38' + digits
    elif digits.startswith('8') and len(digits) == 11:
        return '+3' + digits
    return None

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    required_fields = ['username', 'password', 'email', 'first_name', 'last_name', 'phone_number']
    if not all(field in data and data[field].strip() for field in required_fields):
        return jsonify({"msg": "All fields are required: username, password, email, first_name, last_name, phone_number"}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username is already taken"}), 409

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email is already taken"}), 409

    normalized_phone = normalize_phone(data['phone_number'])
    if not normalized_phone:
        return jsonify({"msg": "Invalid phone number format"}), 400

    if User.query.filter_by(phone_number=normalized_phone).first():
        return jsonify({"msg": "Phone number is already taken"}), 409

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(
        username=data['username'],
        password=hashed_pw,
        email=data['email'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        phone_number=normalized_phone
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Username and password are required"}), 400
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "phone_number": user.phone_number
            }
        }), 200
    return jsonify({"msg": "Bad username or password"}), 401
