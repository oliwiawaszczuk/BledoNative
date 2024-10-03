from flask import Flask
from flask_cors import CORS

from lib import migrate


def create_app(db):
    app = Flask(__name__, static_folder="../static")
    CORS(app, supports_credentials=True)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:030125@localhost:5432/bledo'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)
    with app.app_context():
        db.create_all()

    from routes import create_every_routes
    create_every_routes(app)

    return app
