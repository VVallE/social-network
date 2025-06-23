from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Post, Like

post_bp = Blueprint('posts', __name__, url_prefix='/api')

@post_bp.route('/posts/create', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    content = data.get('content', '')
    if not content:
        return jsonify({"msg": "Content required"}), 400
    post = Post(content=content, mood=data.get('mood'), author_id=get_jwt_identity())
    db.session.add(post)
    db.session.commit()
    return jsonify({"id": post.id, "content": post.content}), 201

@post_bp.route('/posts', methods=['GET'])
def get_posts():
    mood = request.args.get('mood')
    query = Post.query
    if mood:
        query = query.filter_by(mood=mood)
    posts = query.all()
    return jsonify([
        {"id": p.id, "content": p.content, "mood": p.mood, "author_id": p.author_id}
        for p in posts
    ]), 200

@post_bp.route('/posts/<int:post_id>', methods=['PUT'])
@jwt_required()
def update_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"msg": "Post not found"}), 404
    if post.author_id != get_jwt_identity():
        return jsonify({"msg": "Not authorized"}), 403
    data = request.get_json()
    post.content = data.get('content', post.content)
    db.session.commit()
    return jsonify({"msg": "Post updated"}), 200

@post_bp.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"msg": "Post not found"}), 404
    if post.author_id != get_jwt_identity():
        return jsonify({"msg": "Not authorized"}), 403
    db.session.delete(post)
    db.session.commit()
    return jsonify({"msg": "Post deleted"}), 200

@post_bp.route('/posts/<int:post_id>/like', methods=['POST'])
@jwt_required()
def like_post(post_id):
    user_id = get_jwt_identity()
    if Like.query.filter_by(post_id=post_id, user_id=user_id).first():
        return jsonify({"msg": "Already liked"}), 409
    like = Like(post_id=post_id, user_id=user_id)
    db.session.add(like)
    db.session.commit()
    return jsonify({"msg": "Liked"}), 201
