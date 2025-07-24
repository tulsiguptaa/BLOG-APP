from flask import Blueprint, request, jsonify
from models import db, Comment, Post
from datetime import datetime

comments_bp = Blueprint('comments', __name__)

@comments_bp.route('/posts/<int:post_id>/comments', methods=['GET'])
def get_comments(post_id):
    post = Post.query.get_or_404(post_id)
    comments = Comment.query.filter_by(post_id=post_id).order_by(Comment.created_at.asc()).all()
    return jsonify([
        {
            'id': c.id,
            'username': c.username,
            'content': c.content,
            'created_at': c.created_at.isoformat()
        } for c in comments
    ])

@comments_bp.route('/posts/<int:post_id>/comments', methods=['POST'])
def add_comment(post_id):
    post = Post.query.get_or_404(post_id)
    data = request.get_json()
    username = data.get('username')
    content = data.get('content')
    if not content:
        return jsonify({'error': 'Content is required.'}), 400
    comment = Comment(post_id=post_id, username=username, content=content, created_at=datetime.utcnow())
    db.session.add(comment)
    db.session.commit()
    return jsonify({'message': 'Comment added.', 'id': comment.id}), 201 