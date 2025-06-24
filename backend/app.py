from flask import Flask, render_template
from config import Config
from extensions import db, bcrypt, jwt
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)

    with app.app_context():
        from models import User, Post, Like
        db.create_all()

        from routes.auth import auth_bp
        from routes.users import user_bp
        from routes.posts import post_bp

        app.register_blueprint(auth_bp)
        app.register_blueprint(user_bp)
        app.register_blueprint(post_bp)

    @app.route('/')
    def home():
        return render_template('index.html')

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
