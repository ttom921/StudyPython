import hashlib
from .dyndbmanager import db, dbmgr


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))

    def __init__(self, name, username, password, bind=None):
        self.__bind_key__ = bind
        self.name = name
        self.username = username
        self.password = hashlib.sha1(password).hexdigest()

    def __repr__(self):
        return "User('{}','{}','{}')".format(self.name, self.username, self.password)

    def findByName(name, dbname):
        session = dbmgr.getSession(dbname)
        print("findByName:{} (id={})".format(session, id(session)))
        row = session.query(User).filter_by(name=name).first()
        return row

    def getAll(dbname=None):
        session = dbmgr.getSession(dbname)
        return session.query(User).all()

    def delete(row, dbname=None):
        session = dbmgr.getSession(dbname)
        print("delete{} (id={})".format(session, id(session)))
        session.delete(row)
        session.commit()
