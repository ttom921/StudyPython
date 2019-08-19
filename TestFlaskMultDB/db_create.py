# 建立基本資料表，通常沒有資料表的時候才會建立

from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import db, User

app = Flask(__name__)

# 資料庫設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/dbhisharp'
# SQLALCHEMY_BINDS = {
#     'asa':        'mysql://root:12345678@localhost:33306/dbasa',
#     'ups':      'mysql://root:12345678@localhost:33307/dbups'
# }

# 設置每次請求當結束後會自動提交數據庫中的改動
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = True
db.init_app(app)

if __name__ == "__main__":
    try:
        with app.app_context():
            db.create_all()

            user_1 = User('user1', 'username1', 'password_1'.encode('utf-8'))
            session = db.session
            session.add(user_1)
            row = session.query(User).filter_by(name='user1').first()
            if row:
                print('Found user1')
                print(row)
            else:
                print('Can not find user1')
            session.rollback()  # 資料庫回到新增 user1 之前的狀態
    except Exception as e:
        print(e)
    print('User資料表建立完成')
