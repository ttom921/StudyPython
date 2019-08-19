from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import db

app = Flask(__name__)

# 資料庫設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/dbhisharp'
app.config['SQLALCHEMY_BINDS'] = {
    'asa':        'mysql://root:12345678@localhost:33306/dbasa',
    'ups':      'mysql://root:12345678@localhost:33307/dbups'
}
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db.init_app(app)


@app.route("/", methods=["GET", "POST"])
def home():
    return "OK"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
