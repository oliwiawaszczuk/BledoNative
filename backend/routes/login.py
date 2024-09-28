from datetime import datetime

from flask import jsonify, request

from database.models import User, Session
from lib import db
from lib.hash import hash_password, verify_password
from routes.session import create_session


def create_login_routes(app):
    @app.route('/api/auto_login', methods=['POST'])
    def auto_login():
        data = request.get_json()
        token = data.get("token")
        session = Session.query.filter_by(token=token).first()
        if not session:
            return jsonify({"statusText": "Session not found"}), 401

        if session.date_of_expiration < datetime.now():
            return jsonify({"statusText": "Session expired, login again"}), 401

        session.set_date_of_expiration()
        return jsonify({"statusText": "success", "token": token}), 200

    @app.route('/api/login/', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        notification_token = data.get('notification_token')

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"statusText": "user with email: " + email + " does not exist"}), 401

        if not verify_password(password, user.password):
            return jsonify({"statusText": "password is wrong, try again"}), 401

        token = create_session(user.id, notification_token)
        print("Login with token: ", token)
        return jsonify({"statusText": "success", "token": token}), 200

    @app.route('/api/register/', methods=['POST'])
    def register():
        data = request.get_json()
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        notification_token = data.get('notification_token')

        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"statusText": "user with email: " + email + " already exist"}), 401

        new_user = User(username=username, email=email, password=hash_password(password))
        db.session.add(new_user)
        db.session.commit()

        token = create_session(new_user.id, notification_token)
        print("Login with token: ", token)

        return jsonify({"statusText": "success", "token": token}), 200

    @app.route('/api/logout/', methods=['POST'])
    def logout():
        data = request.get_json()
        token = data.get('token')
        session = Session.query.filter_by(token=token).first()
        if session:
            db.session.delete(session)
            db.session.commit()
            print("Logout with token:", token)
        return jsonify({"statusText": "logout successful"}), 200
