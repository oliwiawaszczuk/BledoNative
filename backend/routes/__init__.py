from routes.login import create_login_routes
from routes.test import create_test_routes


def create_every_routes(app):
    create_login_routes(app)
    create_test_routes(app)
