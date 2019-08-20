from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import db, User
from multidbmanager import MultiDBMgr
app = Flask(__name__)

# 資料庫設定
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


@app.route("/", methods=["GET", "POST"])
def home():
    if request.form:
        # 取得使用那一個資料庫
        bindkey = request.form.get("dbkey")
        session = MultiDBMgr.getSession(bindkey)
        try:
            name = request.form.get("name")
            username = request.form.get("username")
            password = request.form.get("password")
            # 檢查是否有重覆的資料
            row = session.query(User).filter_by(name=name).first()
            if not row:
                myuser = User(name, username, password.encode('utf-8'), bindkey)
                print(myuser)
                session.add(myuser)
                session.commit()
        except Exception as e:
            print("加入資料失敗")
            print(e)
    # 取得各個列表
    # 預設列表
    users = None
    session = MultiDBMgr.getSession()
    users = session.query(User).all()
    # asa列表
    asausers = None
    session = MultiDBMgr.getSession("asa")
    asausers = session.query(User).all()
    # ups 列表
    upsusers = None
    session = MultiDBMgr.getSession("ups")
    upsusers = session.query(User).all()
    return render_template("home.html", users=users, asausers=asausers, upsusers=upsusers)


@app.route("/update", methods=["POST"])
def update():

    try:
        # 取得使用那一個資料庫
        bindkey = request.form.get("dbkey")
        session = MultiDBMgr.getSession(bindkey)
        id = request.form.get("id")
        newusername = request.form.get("newusername")
        row = session.query(User).filter_by(id=id).first()
        if row:
            row.username = newusername
            session.commit()
    except Exception as e:
        print("更新資料失敗")
        print(e)
    return redirect("/")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
