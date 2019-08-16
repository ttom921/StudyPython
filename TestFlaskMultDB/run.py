from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask import redirect

app = Flask(__name__)

# 資料庫設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/dbhisharp'
SQLALCHEMY_BINDS = {
    'asa':        'mysql://root:12345678@localhost:33306/dbasa',
    'ups':      'mysql://root:12345678@localhost:33307/dbups'
}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


@app.route("/", methods=["GET", "POST"])
def home():
    return "OK"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
