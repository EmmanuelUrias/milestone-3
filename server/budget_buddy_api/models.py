from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50))
    password = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    budget = db.Column(db.Float)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    expenses = relationship("Expenses", backref="user")
    goals = relationship("Goal", backref="user")


class Expenses(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, db.ForeignKey('users.id'))
    expense_id = db.Column(db.Integer, primary_key=True)
    expense_name = db.Column(db.String(100))
    expense_amount = db.Column(db.Float)
    expense_type = db.Column(db.String(100))
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)


class Goal(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, db.ForeignKey('users.id'))
    goal_id = db.Column(db.Integer, primary_key=True)
    goal_amount = db.Column(db.Float)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.utcnow)
