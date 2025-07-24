from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Post, User

posts_bp = Blueprint('posts', __name__)

@posts_bp.route('/', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([
        {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'author': post.author.username if post.author else None,
            'author_id': post.author_id,
            'created_at': post.created_at.isoformat()
        } for post in posts
    ])

@posts_bp.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get_or_404(post_id)
    return jsonify({
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': post.author.username if post.author else None,
        'author_id': post.author_id,
        'created_at': post.created_at.isoformat()
    })

@posts_bp.route('/', methods=['POST'])
@jwt_required()
def create_post():
    print("Headers:", dict(request.headers))
    print("Data:", request.data)
    print("JSON:", request.get_json())
    data = request.get_json()
    title = data.get('title') if data else None
    content = data.get('content') if data else None
    print("Title:", title)
    print("Content:", content)
    user_id = int(get_jwt_identity())
    if not title or not content:
        return jsonify({'error': 'Title and content required.'}), 400
    post = Post(title=title, content=content, author_id=user_id)
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created.', 'id': post.id}), 201

@posts_bp.route('/<int:post_id>', methods=['PUT'])
@jwt_required()
def update_post(post_id):
    print("[DEBUG] PUT /posts/<id> called")
    print("Headers:", dict(request.headers))
    print("JSON:", request.get_json())
    post = Post.query.get_or_404(post_id)
    user_id = int(get_jwt_identity())
    print("[DEBUG] User ID from JWT:", user_id)
    print("[DEBUG] Post author ID:", post.author_id)
    if post.author_id != user_id:
        print("[DEBUG] Unauthorized: user is not the author.")
        return jsonify({'error': 'Unauthorized.'}), 403
    data = request.get_json()
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    return jsonify({'message': 'Post updated.'})

@posts_bp.route('/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    print("\n===== [DEBUG] DELETE /posts/<post_id> =====")
    print("[DEBUG] Request headers:", dict(request.headers))

    post = Post.query.get_or_404(post_id)

    user_id = int(get_jwt_identity())   # <-- FIX HERE
    print("[DEBUG] User ID from JWT (get_jwt_identity()):", user_id, type(user_id))
    print("[DEBUG] Post author ID (from DB):", post.author_id, type(post.author_id))

    if post.author_id != user_id:
        print("[DEBUG] Unauthorized: User is not the author of this post.")
        print("==============================================\n")
        return jsonify({'error': 'Unauthorized.'}), 403

    db.session.delete(post)
    db.session.commit()
    print("[DEBUG] Post deleted successfully.")
    print("==============================================\n")
    return jsonify({'message': 'Post deleted.'})
