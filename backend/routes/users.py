from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User

user_bp = Blueprint('users', __name__, url_prefix='/api')

@user_bp.route('/me', methods=['GET'])
@jwt_required()
def get_my_profile():
    user = User.query.get(get_jwt_identity())
    if user:
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number
        }), 200
    return jsonify({"msg": "User not found"}), 404

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "id": user.id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name
        }), 200
    return jsonify({"msg": "User not found"}), 404
