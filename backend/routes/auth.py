from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data.get('username') or not data.get('password') or not data.get('email'):
        return jsonify({"msg": "Username, password and email are required"}), 400

    if User.query.filter_by(username=data['username']).first():
        return jsonify({"msg": "Username is already taken"}), 409

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email is already taken"}), 409

    if data.get('phone_number') and User.query.filter_by(phone_number=data['phone_number']).first():
        return jsonify({"msg": "Phone number is already taken"}), 409

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(
        username=data['username'],
        password=hashed_pw,
        email=data['email'],
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', ''),
        phone_number=data.get('phone_number', '')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
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
