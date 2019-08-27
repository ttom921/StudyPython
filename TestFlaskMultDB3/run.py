from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import User
from database.dbmanager import dbmgr

app = Flask(__name__)

# 資料庫設定
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/dbhisharp'
# app.config["SQLALCHEMY_BINDS"] = {}

# 設置每次請求當結束後會自動提交數據庫中的改動
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = False

# db.init_app(app)

# 動態加入資料庫
dbmgr.AddDBUrl("default", 'mysql://root:12345678@localhost:3306/dbhisharp')
dbmgr.AddDBUrl("asa", 'mysql://root:12345678@localhost:33306/dbasa')
dbmgr.AddDBUrl("ups", 'mysql://root:12345678@localhost:33307/dbups')


@app.route("/", methods=["GET", "POST"])
def home():

    # bindkey = dbkey
    # session = dbmgr.getSession(bindkey)
    # for idx in range(1, 10):
    #     name = dbkey+"user"+str(idx)
    #     username = dbkey+"username"+str(idx)
    #     password = "password_"+str(idx)
    #     myuser = User(name, username, password.encode('utf-8'), bindkey)
    #     print(myuser)
    #     session.add(myuser)
    # session.commit()

    # return "OK"
    # 取得使用那一個資料庫
    bindkey = request.form.get("dbkey")

    if request.form:
        try:
            session = dbmgr.getSession(bindkey)
            name = request.form.get("name")
            username = request.form.get("username")
            password = request.form.get("password")
            # 檢查是否有重覆的資料
            row = User.findByName(name, session)
            if not row:
                myuser = User(name, username, password.encode('utf-8'))
                print(myuser)
                session.add(myuser)
                session.commit()
        except Exception as e:
            print("加入資料失敗")
            print(e)
    # 取得各個列表
    # 預設列表
    users = None
    users = User.getAll()
    # asa列表
    asausers = None
    asausers = User.getAll("asa")
    # ups 列表
    upsusers = None
    upsusers = User.getAll("ups")
    return render_template("home.html", users=users, asausers=asausers, upsusers=upsusers)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
