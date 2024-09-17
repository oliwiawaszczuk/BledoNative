from flask import jsonify, request

from database.models import User
from lib import db
from lib.hash import hash_password, verify_password


def create_login_routes(app):
    @app.route('/api/users', methods=['GET'])
    def get_users():
        users = User.query.all()
        return jsonify([{'id': user.id, 'username': user.username} for user in users])

    @app.route('/api/login/', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"statusText": "user with email: " + email + " does not exist"}), 401

        if not verify_password(password, user.password):
            return jsonify({"statusText": "password is wrong, try again"}), 401

        return jsonify({"statusText": "success"}), 200

    @app.route('/api/register/', methods=['POST'])
    def register():
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"statusText": "user with email: " + email + " already exist"}), 401

        new_user = User(username=username, email=email, password=hash_password(password))
        new_user.id = len([user.id for user in User.query.all()]) + 1
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"statusText": "success"}), 200