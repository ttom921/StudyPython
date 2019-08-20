# 來建立測試用的資料
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import db, User
from multidbmanager import MultiDBMgr
app = Flask(__name__)

# 資料庫設定
# SQLALCHEMY_DATABASE_URI = 'mysql://root:12345678@localhost:3306/dbhisharp'
# SQLALCHEMY_BINDS = {
#     'asa':        'mysql://root:12345678@localhost:33306/dbasa',
#     'ups':      'mysql://root:12345678@localhost:33307/dbups'
# }
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/dbhisharp'
app.config["SQLALCHEMY_BINDS"] = {
    'asa': 'mysql://root:12345678@localhost:33306/dbasa',
    'ups': 'mysql://root:12345678@localhost:33307/dbups'
}

# 設置每次請求當結束後會自動提交數據庫中的改動
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = False
db.init_app(app)


# 增加
def TestAddDBdata(dbkey=""):
    bindkey = dbkey
    session = MultiDBMgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        username = dbkey+"username"+str(idx)
        password = "password_"+str(idx)
        myuser = User(name, username, password.encode('utf-8'), bindkey)
        print(myuser)
        session.add(myuser)
        session.commit()


# 刪除
def TestDelDBdata(dbkey=""):
    bindkey = dbkey
    session = MultiDBMgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        row = session.query(User).filter_by(name=name).first()
        if row:
            session.delete(row)
    session.commit()


# 查詢
def TestFindDBdata(dbkey=""):
    bindkey = dbkey
    session = MultiDBMgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        row = session.query(User).filter_by(name=name).first()
        if row:
            print(row)


# 修改
def TestModDBdata(dbkey=""):
    bindkey = dbkey
    session = MultiDBMgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        row = session.query(User).filter_by(name=name).first()
        if row:
            row.username += "mod"
            print(row)
    session.commit()


if __name__ == "__main__":
    try:
        # TestAddDBdata("asa")
        with app.app_context():
            # 增
            print("增加資料----------------")
            TestAddDBdata()
            TestAddDBdata("asa")
            TestAddDBdata("ups")
            # 修改
            print("修改資料----------------")
            TestModDBdata()
            TestModDBdata("asa")
            TestModDBdata("ups")
            # 查
            print("查詢資料----------------")
            TestFindDBdata()
            TestFindDBdata("asa")
            TestFindDBdata("ups")
            # 刪
            print("刪除資料----------------")
            TestDelDBdata()
            TestDelDBdata("asa")
            TestDelDBdata("ups")

    except Exception as e:
        print(e)
    print('資料表增刪查改完成')

    # bindkey = "asa"
    # user_1 = User('asauser1', 'username1',
    #               'password_1'.encode('utf-8'), bindkey)
    # session = MultiDBMgr.getSession(bindkey)
    # session.add(user_1)
    # session.commit()
    # row = session.query(User).filter_by(name='asauser1').first()
    # if row:
    #     print('Found asauser1')
    #     print(row)
    # else:
    #     print('Can not find asauser1')
