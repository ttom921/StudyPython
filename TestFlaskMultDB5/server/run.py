from flask import Flask, Response, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import redirect
from database.models import User, UserSchema
from database.dyndbmanager import db, ma, dbmgr
from flask_cors import CORS
from lib.retrespon import *

app = Flask(__name__)
CORS(app)
# 資料庫設定
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/dbhisharp'
app.config["SQLALCHEMY_BINDS"] = {}

# 設置每次請求當結束後會自動提交數據庫中的改動
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# 查詢時會顯示原始SQL語句
app.config['SQLALCHEMY_ECHO'] = False

db.init_app(app)
ma.init_app(app)

# 檢查資料庫是否合法


def checkdbname(dbname=None):
    if dbname == "" or dbname == "default":
        return None
    else:
        return dbname


@app.route("/databaseproc", methods=["GET", "POST"])
def databaselist():

    try:
        if request.form:
            dbkey = request.form.get("dbkey")
            dburl = request.form.get("dburl")
            password = request.form.get("password")
            fmt = '%s-> %s' % (dbkey, dburl)
            print(fmt)
            dbmgr.AddDBUrl(dbkey, dburl)
            responseObject = resData("success", "資料庫連結加入成功")
            return jsonify(responseObject), 200
        else:
            # 取得資料庫列表
            result = dbmgr.getAllDB()
            X_Total_Count = len(result)
            resp = jsonify(result)
            resp.status_code = 200
            # 可加入多少個
            resp.headers.add('X-Total-Count', X_Total_Count)
            return resp
            # return jsonify(result)
    except Exception as e:
        print("Failed to api databaseproc")
        print(e)
        responseObject = resData("fail", "Failed to api databaseproc")
        return jsonify(responseObject), 500


@app.route("/databaseproc/<dbkey>", methods=["DELETE"])
def database_delete(dbkey):
    try:
        # if request.form:
        #     dbkey = request.form.get("dbkey")
        #     dburl = request.form.get("dburl")
        #     fmt = '%s-> %s' % (dbkey, dburl)
        print(dbkey)
        dbmgr.DelDBUrl(dbkey)
        responseObject = resData("success", "資料庫連結刪除成功")
        return jsonify(responseObject), 200
        # user = User.query.get(id)
        # db.session.delete(user)
        # db.session.commit()
        # return user_schema.jsonify(user)
    except Exception as e:
        print("Failed to delete api databaseproc")
        print(e)
        responseObject = resData("fail", "Failed to delete api databaseproc")
        return jsonify(responseObject), 500

# endpoint to create new user
@app.route("/user", methods=["POST"])
def add_user():
    if request.form:
        try:
            dbkey = checkdbname(request.form.get('dbkey'))
            name = request.form.get("name")
            username = request.form.get("username")
            password = request.form.get("password")

            new_user = User(name, username, password.encode('utf-8'), dbkey)
            session = dbmgr.getSession(dbkey)
            session.add(new_user)
            session.commit()
            user_schema = UserSchema()
            return user_schema.jsonify(new_user)
            # result = UserSchema.dump(new_user)
            # return jsonify(result), 200
            # return user_schema.jsonify(new_user)
            # db.session.add(new_user)
            # db.session.commit()
            # return UserSchema.jsonify(new_user)
            #result = {'data': 'ok'}
            # return jsonify(result), 200
        except Exception as e:
            print("Failed to add user")
            print(e)
            result = {'data': 'notok'}
            return jsonify(result), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=False)
