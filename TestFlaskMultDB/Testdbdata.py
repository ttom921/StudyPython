# 來建立測試用的資料
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import db, User
#from multi_db_management import prepare_bind
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
    'asa':        'mysql://root:12345678@localhost:33306/dbasa',
    'ups':      'mysql://root:12345678@localhost:33307/dbups'
}

# 設置每次請求當結束後會自動提交數據庫中的改動
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = True
db.init_app(app)


def TestAddDBdata(dbkey=""):
    bindkey = dbkey
    for idx in range(1, 10):
        name = dbkey+"user"+str(idx)
        username = dbkey+"username"+str(idx)
        password = "password_"+str(idx)
        print(password)
    myuser = User('asauser1', 'username1', 'password_1'.encode('utf-8'), bindkey)


if __name__ == "__main__":
    try:
        # TestAddDBdata("asa")
        with app.app_context():

            bindkey = "asa"
            user_1 = User('asauser1', 'username1',
                          'password_1'.encode('utf-8'), bindkey)
            session = MultiDBMgr.getSession(bindkey)
            session.add(user_1)
            session.commit()
            row = session.query(User).filter_by(name='asauser1').first()
            if row:
                print('Found asauser1')
                print(row)
            else:
                print('Can not find asauser1')

    except Exception as e:
        print(e)
    print('User資料表建立完成')
