import hashlib
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, backref
from dbprovide import DbProvide

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(64))
    username = Column(String(80))
    password = Column(String(80))

    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = hashlib.sha1(password).hexdigest()

    def __repr__(self):
        return "User('{}','{}','{}')".format(self.name, self.username, self.password)


if __name__ == '__main__':
    # ''' 此時只有建立 SQLAlchemy Engine 實例，還沒在記憶體內建立資料，
    #     只有第一個 SQL 指令被下達時，才會真正連接到資料庫內執行 '''
    # engine = create_engine('sqlite:///:memory:', echo=True)
    # ''' 真正建立表格是使用 Base.metadata.create_all(engine) '''
    # Base.metadata.create_all(engine)
    # auser = User('user1', 'username', 'password'.encode('utf-8'))
    # print('Mapper:', auser.__mapper__)

    # 建立和測試資料表測試dbhisharp

    dbprv = DbProvide()
    Base.metadata.create_all(dbprv.db)
    user_1 = User('user1', 'username1', 'password_1'.encode('utf-8'))
    session = dbprv.session
    session.add(user_1)
    row = session.query(User).filter_by(name='user1').first()
    if row:
        print('Found user1')
        print(row)
    else:
        print('Can not find user1')
    session.rollback()  # 資料庫回到新增 user1 之前的狀態

    print("測試dbhisharp完成-------------")

    # 建立和測試資料表測試dbasa

    dbprv = DbProvide("asa")
    Base.metadata.create_all(dbprv.db)
    user_1 = User('user1', 'username1', 'password_1'.encode('utf-8'))
    session = dbprv.session
    session.add(user_1)
    row = session.query(User).filter_by(name='user1').first()
    if row:
        print('Found user1')
        print(row)
    else:
        print('Can not find user1')
    session.rollback()  # 資料庫回到新增 user1 之前的狀態

    print("測試dbasa完成-------------")

    # 建立和測試資料表測試dbasa

    dbprv = DbProvide("ups")
    Base.metadata.create_all(dbprv.db)
    user_1 = User('user1', 'username1', 'password_1'.encode('utf-8'))
    session = dbprv.session
    session.add(user_1)
    row = session.query(User).filter_by(name='user1').first()
    if row:
        print('Found user1')
        print(row)
    else:
        print('Can not find user1')
    session.rollback()  # 資料庫回到新增 user1 之前的狀態

    print("測試dbups完成-------------")
