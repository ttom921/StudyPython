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


def checkdbname(dbname=None):
    if dbname == "":
        return None
    else:
        return dbname


@app.route("/", methods=["GET", "POST"])
def home():
    # 取得使用那一個資料庫
    bindkey = checkdbname(request.form.get("dbkey"))
    if request.form:
        try:
            session = dbmgr.getSession(bindkey)
            print("新增:{} (id={})".format(session, id(session)))
            name = request.form.get("name")
            username = request.form.get("username")
            password = request.form.get("password")
            # 檢查是否有重覆的資料
            row = User.findByName(name, bindkey)
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
    # dbkey = None
    # bindkey = dbkey
    # dbkey = ""
    # session = dbmgr.getSession(bindkey)
    # print("新增:{} (id={})".format(session, id(session)))
    # for idx in range(1, 10):
    #     name = dbkey+"user"+str(idx)
    #     username = dbkey+"username"+str(idx)
    #     password = "password_"+str(idx)
    #     myuser = User(name, username, password.encode('utf-8'), bindkey)
    #     # 檢查是否有重覆的資料
    #     row = User.findByName(name, bindkey)
    #     if not row:
    #         print(myuser)
    #         session.add(myuser)

    # session.commit()

    # #
    # dbkey = "asa"
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
    # #
    # dbkey = "ups"
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
    # return "OK"
# 更新資料
@app.route("/update", methods=["POST"])
def update():

    try:
        # 取得使用那一個資料庫
        bindkey = checkdbname(request.form.get("dbkey"))
        session = dbmgr.getSession(bindkey)
        print("修改:{} (id={})".format(session, id(session)))
        uid = request.form.get("id")
        newusername = request.form.get("newusername")
        row = session.query(User).filter_by(id=uid).first()
        if row:
            row.username = newusername
            session.commit()
    except Exception as e:
        print("更新資料失敗")
        print(e)
    return redirect("/")

# 刪除
@app.route("/delete", methods=["POST"])
def delete():
    try:
        # 取得使用那一個資料庫
        bindkey = checkdbname(request.form.get("dbkey"))
        session = dbmgr.getSession(bindkey)
        print("刪除:{} (id={})".format(session, id(session)))
        uid = request.form.get("id")
        row = session.query(User).filter_by(id=uid).first()
        if row:
            User.delete(row, bindkey)
            # session.delete(row)
            # session.commit()

    except Exception as e:
        print("刪除資料失敗")
        print(e)
    return redirect("/")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
