from database.models import Session
from lib import db
from lib.creator import create_session_token


def create_session_routes(app):
    # @app.route('/get')
    pass


def create_session(user_id: int, notification_token: str | None) -> str:
    token: str = create_session_token()
    while Session.query.filter(Session.token == token).first() is not None:
        token = create_session_token()

    new_session = Session(user_id, token, notification_token)
    db.session.add(new_session)
    db.session.commit()

    return new_session.token
