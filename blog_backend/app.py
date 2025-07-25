from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
import os

from routes.auth import auth_bp
from routes.posts import posts_bp
from routes.subscriber import subscriber_bp
from routes.comments import comments_bp

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key')

    db.init_app(app)
    CORS(app, supports_credentials=True)
    JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(posts_bp, url_prefix='/posts')
    app.register_blueprint(subscriber_bp, url_prefix='/api')
    app.register_blueprint(comments_bp, url_prefix='/')

    @app.route('/')
    def index():
        return {'message': 'Blog API is running!'}

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
