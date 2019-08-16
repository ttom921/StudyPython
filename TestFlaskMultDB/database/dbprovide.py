from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 依名稱來提供不同的資料庫的連線目前有預設，asa，ups


class DbProvide():
    db = None
    connection = None
    session = None

    def __init__(self, center=None):
        if center == None:
            self.db = create_engine(
                'mysql://root:12345678@localhost:3306/dbhisharp', echo=True, pool_threadlocal=True)
            self.connection = self.db.connect()
        if center == "asa":
            self.db = create_engine(
                'mysql://root:12345678@localhost:33306/dbasa', echo=True, pool_threadlocal=True)
            self.connection = self.db.connect()
        if center == "ups":
            self.db = create_engine(
                'mysql://root:12345678@localhost:33307/dbups', echo=True, pool_threadlocal=True)
            self.connection = self.db.connect()
        Session = sessionmaker(bind=self.db)
        self.session = Session()
