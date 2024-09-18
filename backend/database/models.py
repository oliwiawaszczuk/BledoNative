from datetime import datetime, timedelta

from lib import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=True, nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password


class Session(db.Model):
    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    token = db.Column(db.String(80), unique=True, nullable=False)
    notification_token = db.Column(db.String(80), nullable=True)
    date_of_creation = db.Column(db.DateTime, nullable=False)
    date_of_expiration = db.Column(db.DateTime, nullable=False)

    def __init__(self, user_id, token, notification_token):
        self.user_id = user_id
        self.token = token
        if notification_token:
            self.notification_token = notification_token
        self.date_of_creation = datetime.now()
        self.set_date_of_expiration()

    def set_date_of_expiration(self):
        self.date_of_expiration = datetime.now() + timedelta(days=30 if self.notification_token else 7)