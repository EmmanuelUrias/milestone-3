from dotenv import load_dotenv
from flask import Flask
from flask_migrate import Migrate
import os


def create_app():
    app = Flask(__name__)

    load_dotenv()
    DATABASE_URI = os.getenv('DATABASE_URI')

    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    @app.route('/')
    def hello():
        return 'Hello this is your Budget Buddy!!'

    from . import models
    models.db.init_app(app)
    migrate = Migrate(app, models.db)

    from . import users_controller
    app.register_blueprint(users_controller.bp)

    return app
