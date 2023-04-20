from dotenv import dotenv_values
from flask import Flask
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__)

    URI = dotenv_values('.env')

    app.config['SQLALCHEMY_DATABASE_URI'] = f'{URI}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    @app.route('/')
    def hello():
        return 'Hello this is your Budget Buddy!!'

    from . import models
    models.db.init_app(app)
    migrate = Migrate(app, models.db)

    from . import users_controller
    app.register_blueprint(users_controller.bp)

    if __name__ == '__main__':
        app.run()

    return app
