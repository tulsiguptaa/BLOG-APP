from flask import Blueprint, request, jsonify
from models import db, Subscriber

subscriber_bp = Blueprint('subscriber', __name__)

@subscriber_bp.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Check if already subscribed
    if Subscriber.query.filter_by(email=email).first():
        return jsonify({'message': 'Already subscribed'}), 200

    subscriber = Subscriber(email=email)
    db.session.add(subscriber)
    db.session.commit()
    return jsonify({'message': 'Subscribed successfully'}), 201
