
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from flask import current_app
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class SessionManager(object):
    DBBinds = {}

    def __init__(self):
        print("SessionManager.__init__")
        self.dbname = None
        self.session = None

    # 取得資料庫的session
    def getSession(self, dbname=None):
        # 檢查是那一個資料庫
        db_name = None
        if dbname in SessionManager.DBBinds:
            db_name = dbname
        else:
            db_name = "default"
        # 檢查是否是同一個session
        if self.session:
            if self.session.name == db_name:
                return self.session
            else:
                self.session.remove()
                self.session = None

        if not self.session:
            engine = create_engine(SessionManager.DBBinds[db_name])
            db_session = scoped_session(sessionmaker(bind=engine))
            db_session.name = db_name
            self.session = db_session
        return db_session
    # 加入資料的連結

    def AddDBUrl(self, key, dburl):
        if key not in SessionManager.DBBinds:
            SessionManager.DBBinds[key] = dburl
        else:
            SessionManager.DBBinds[key] = dburl
        # print(SessionManager.DBBinds)


dbmgr = SessionManager()
