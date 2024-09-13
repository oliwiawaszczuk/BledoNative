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

    def __init__(self, username):
        self.username = username


@app.route('/api/users', methods=['GET'])
def get_users():
    print("pobiera users")
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


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)
