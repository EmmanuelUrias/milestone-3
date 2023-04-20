from flask import (Blueprint, request, redirect)
from . import models

bp = Blueprint(
    'users',
    __name__,
    url_prefix='/users'
)

users = ''


@bp.route('/')
def get_all_users():
    return users


@bp.route('<int:id>', methods=['GET'])
def get_user(id):
    user = users[id - 1]
    return user
