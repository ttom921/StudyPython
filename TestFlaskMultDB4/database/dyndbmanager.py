from flask import current_app
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class DynDBManager():
    def __init__(self):
        print("DynDBManager.__init__")
        self.app = current_app
        self.db = db
        self.dburl = None
        self.session = None

    # 加入資料的連結
    def AddDBUrl(self, key, dburl):
        if key not in current_app.config['SQLALCHEMY_BINDS']:
            current_app.config['SQLALCHEMY_BINDS'][key] = dburl
        else:
            current_app.config['SQLALCHEMY_BINDS'][key] = dburl
        # 重新整理連結的資料庫
        self.db.get_binds(self.app)
        print(current_app.config['SQLALCHEMY_BINDS'])

    def getSession(self, dbname=None):
        db_name = dbname
        # 檢查是否是同一個session
        if self.session:
            if self.session.name == db_name:
                return self.session
            else:
                self.session = None

        if not self.session:
            engine = db.get_engine(self.app, dbname)
            db.session.bind = engine
            session_maker = db.sessionmaker()
            session_maker.configure(bind=engine)
            session = session_maker()
            session.name = db_name
            self.session = session
            return session


dbmgr = DynDBManager()
