from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__, url_prefix='/api')


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data.get('username') or not data.get('password'):
        return jsonify({"msg": "Username and password are required"}), 400

    if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
        return jsonify({"msg": "Username is already taken"}), 409

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
        token = create_access_token(identity=str(user.id))
        return jsonify({"access_token": token}), 200
    return jsonify({"msg": "Bad username or password"}), 401
