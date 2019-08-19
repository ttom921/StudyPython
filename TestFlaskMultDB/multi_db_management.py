from database.models import User
from database.models import db
from flask import current_app


def prepare_bind(dbname):
    bindstring = None
    if dbname not in current_app.config['SQLALCHEMY_BINDS']:
        bindstring = current_app.config['SQLALCHEMY_DATABASE_URI']
    else:
        bindstring = current_app.config['SQLALCHEMY_BINDS'][dbname]
    return bindstring
