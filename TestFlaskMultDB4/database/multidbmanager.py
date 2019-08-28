from flask import current_app
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class DBManager():
    def __init__(self):
        self.app = current_app
        self.db = db

    def check_bind(self, dbname=None):
        bindstat = None
        if dbname in current_app.config['SQLALCHEMY_BINDS']:
            bindstat = dbname
        return bindstat

    def getSession(self, dbname=None):
            # print(db.get_engine(self.app))
            # print(db.get_engine(self.app, 'asa'))
            # print(db.get_engine(self.app, 'ups'))
        engine = None
        bindstate = self.check_bind(dbname)
        if(bindstate == None):
            engine = db.get_engine(self.app)
        else:
            engine = db.get_engine(self.app, dbname)
        db.session.bind = engine
        session_maker = db.sessionmaker()
        session_maker.configure(bind=engine)
        session = session_maker()
        return session


dbmgr = DBManager()
