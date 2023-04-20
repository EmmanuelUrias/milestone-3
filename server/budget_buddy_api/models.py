from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import datetime

db = SQLAlchemy()


class User(db.model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.string(50))
    password = db.Column(db.string(50))
    email = db.Column(db.string(100))
    budget = db.Column(db.Integer)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    expenses = relationship("Expenses", backref="user")
    goals = relationship("Goal", backref="user")


class Expenses(db.model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, db.ForeignKey('users.id'))
    expense_id = db.Column(db.Integer)
    expense_name = db.Column(db.string(100))
    expense_amount = db.Column(db.Integer)
    expense_type = db.Column(db.string(100))
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class Goal(db.model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, db.ForeignKey('users.id'))
    goal_id = db.Column(db.Integer)
    goal_amount = db.Column(db.Integer)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
