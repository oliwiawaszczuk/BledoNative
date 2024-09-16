from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bledo_owner:qIpkKeH39COr@ep-odd-shape-a2ji0dpa.eu-central-1.aws.neon.tech/bledo?sslmode=require'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username} for user in users])


@app.route('/api/users', methods=['POST'])
def create_user():
    username = request.get_data().decode('utf-8')
    new_user = User(username=username)
    new_user.id = len([user.id for user in User.query.all()]) + 1
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"id": new_user.id, "username": new_user.username}), 201


@app.route('/api/login/', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(email, password)

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"statusText": "user with login does not exist"}), 401

    if user.password != password:
        return jsonify({"statusText": "password is wrong, try again"}), 401

    return jsonify({"statusText": "success"}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port="5000", debug=True)
