# 來建立測試用的資料
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import User
from database.dbmanager import db, dbmgr

app = Flask(__name__)


# 設置每次請求當結束後會自動提交數據庫中的改動
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = False

# 動態加入資料庫
dbmgr.AddDBUrl("default", 'mysql://root:12345678@localhost:3306/dbhisharp')
dbmgr.AddDBUrl("asa", 'mysql://root:12345678@localhost:33306/dbasa')
dbmgr.AddDBUrl("ups", 'mysql://root:12345678@localhost:33307/dbups')

# 增加


def TestAddDBdata(dbkey=""):
    bindkey = dbkey
    session = dbmgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        username = dbkey+"username"+str(idx)
        password = "password_"+str(idx)
        myuser = User(name, username, password.encode('utf-8'))
        print(myuser)
        session.add(myuser)
    session.commit()


# 刪除
def TestDelDBdata(dbkey=""):
    bindkey = dbkey
    session = dbmgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        row = session.query(User).filter_by(name=name).first()
        if row:
            session.delete(row)
    session.commit()


# 查詢
def TestFindDBdata(dbkey=""):
    bindkey = dbkey
    session = dbmgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        row = session.query(User).filter_by(name=name).first()
        if row:
            print(row)


# 修改
def TestModDBdata(dbkey=""):
    bindkey = dbkey
    session = dbmgr.getSession(bindkey)
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
            # 增加
            print("增加資料----------------")
            TestAddDBdata()
            TestAddDBdata("asa")
            TestAddDBdata("ups")
            # 修改
            print("修改資料----------------")
            TestModDBdata()
            TestModDBdata("asa")
            TestModDBdata("ups")
            # # 查
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
