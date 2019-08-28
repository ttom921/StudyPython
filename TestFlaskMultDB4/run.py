from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import User
from database.dyndbmanager import db, dbmgr

app = Flask(__name__)

# 資料庫設定
# 資料庫設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/dbhisharp'
app.config["SQLALCHEMY_BINDS"] = {}

# 設置每次請求當結束後會自動提交數據庫中的改動
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = False

db.init_app(app)

# 動態加入資料庫
with app.app_context():
    dbmgr.AddDBUrl("asa", 'mysql://root:12345678@localhost:33306/dbasa')
    dbmgr.AddDBUrl("ups", 'mysql://root:12345678@localhost:33307/dbups')
    # db.get_binds()


@app.route("/", methods=["GET"])
def home():
    dbkey = None
    bindkey = dbkey
    dbkey = ""
    session = dbmgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        username = dbkey+"username"+str(idx)
        password = "password_"+str(idx)
        myuser = User(name, username, password.encode('utf-8'), bindkey)
        print(myuser)
        session.add(myuser)
    session.commit()
    #
    dbkey = "asa"
    bindkey = dbkey
    session = dbmgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        username = dbkey+"username"+str(idx)
        password = "password_"+str(idx)
        myuser = User(name, username, password.encode('utf-8'), bindkey)
        print(myuser)
        session.add(myuser)
    session.commit()
    #
    dbkey = "ups"
    bindkey = dbkey
    session = dbmgr.getSession(bindkey)
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        username = dbkey+"username"+str(idx)
        password = "password_"+str(idx)
        myuser = User(name, username, password.encode('utf-8'), bindkey)
        print(myuser)
        session.add(myuser)
    session.commit()

    # session = session_manager.session
    # dbkey = "db1"
    # for idx in range(1, 10):
    #     name = dbkey+"user"+str(idx)
    #     username = dbkey+"username"+str(idx)
    #     password = "password_"+str(idx)
    #     myuser = User(name, username, password.encode('utf-8'))
    #     print(myuser)
    #     session.add(myuser)
    # session.commit()
    # 單元測試
    # dbmgr.getSession()
    # dbmgr.getSession("asa")
    # dbmgr.getSession("ups")

    # print(dbmgr)
    return "OK"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
