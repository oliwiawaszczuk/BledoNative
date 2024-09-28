from flask import jsonify, request

from database.models import Session, User
from lib import db


def create_user_routes(app):
    @app.route('/api/get_user_details/<token>')
    def get_user_details(token):
        user_id = Session.query.filter_by(token=token).first().user_id
        user = User.query.filter_by(id=user_id).first()

        return jsonify({"user": user.to_dict()}), 200

    @app.route('/api/get_user_details_by_email/<email>')
    def get_user_details_by_email(email):
        user = User.query.filter_by(email=email).first()

        return jsonify({"user": user.to_dict()}), 200

    @app.route('/api/change_user_info/<token>', methods=['POST'])
    def change_user_info(token):
        data = request.get_json()
        username = data['username']
        position = data['position']
        description = data['description']

        user_id = Session.query.filter_by(token=token).first().user_id
        user = User.query.filter_by(id=user_id).first()

        user.username = username
        user.position = position
        user.description = description
        db.session.commit()

        return jsonify({"message": "success"}), 200

    @app.route('/api/get_all_users')
    def get_all_users():
        users = User.query.all()
        sorted_users = sorted(users, key=lambda user: user.username.lower())
        users_dict = [user.to_dict() for user in sorted_users]
        return jsonify({"users": users_dict}), 200
