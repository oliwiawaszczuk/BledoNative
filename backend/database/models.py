from datetime import datetime, timedelta

from sqlalchemy.dialects.postgresql import JSON

from lib import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=True, nullable=False)
    img_path = db.Column(db.String(80), nullable=True)
    description = db.Column(db.String(256), nullable=True)
    position = db.Column(db.String(44), nullable=True)

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


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(256), nullable=True)
    creator_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # people_in_projekt = db.Column(JSON, nullable=True)
    # invited_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, name, description, creator_user_id):
        self.name = name
        self.description = description
        self.creator_user_id = creator_user_id


class Person_in_project(db.Model):
    __tablename__ = 'person_in_project'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    permission_id = db.Column(db.Integer, db.ForeignKey('permissions.id'))

    def __init__(self, project_id, user_id, permission_id):
        self.project_id = project_id
        self.user_id = user_id
        self.permission_id = permission_id


class Invited_person_to_project(db.Model):
    __tablename__ = 'invited_person_to_project'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    invited_by = db.Column(db.String(80), db.ForeignKey('users.username'))
    description = db.Column(db.String(256), nullable=True)

    def __init__(self, user_id, project_id, invited_by, description):
        self.user_id = user_id
        self.project_id = project_id
        self.invited_by = invited_by
        if description:
            self.description = description
        else:
            self.description = "Join us!"


class Permission(db.Model):
    __tablename__ = 'permissions'
    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    # permisje na cos
    # kolejne cos

    def __init__(self):
        pass

    def set_as_admin(self):
        pass # pozwolenie na wszystko

    def set_as_viewer(self):
        pass


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
