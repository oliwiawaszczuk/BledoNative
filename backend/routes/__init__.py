from routes.login import create_login_routes
from routes.projects import create_projects_routes
from routes.session import create_session_routes
from routes.test import create_test_routes
from routes.user import create_user_routes


def create_every_routes(app):
    create_login_routes(app)
    create_test_routes(app)
    create_session_routes(app)
    create_projects_routes(app)
    create_user_routes(app)
