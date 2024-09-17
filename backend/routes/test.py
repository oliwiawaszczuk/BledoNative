from lib import db


def create_test_routes(app):
    @app.route('/test_connection')
    def test_connection():
        try:
            result = db.session.execute('SELECT 1').scalar()
            return "Połączenie z bazą danych działa!", 200
        except Exception as e:
            return f"Problem z połączeniem: {str(e)}", 500