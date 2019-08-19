import hashlib
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = hashlib.sha1(password).hexdigest()

    def __repr__(self):
        return "User('{}','{}','{}')".format(self.name, self.username, self.password)

