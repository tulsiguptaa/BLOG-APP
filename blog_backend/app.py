from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
import os

from routes.auth import auth_bp
from routes.posts import posts_bp

def create_app():
    app = Flask(__name__)

    # Config
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///database.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key')

    # Extensions
    db.init_app(app)
    CORS(app, supports_credentials=True) # Allow all origins for debugging
    JWTManager(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(posts_bp, url_prefix='/posts')

    @app.route('/')
    def index():
        return {'message': 'Blog API is running!'}

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
