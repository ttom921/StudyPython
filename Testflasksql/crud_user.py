from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

# 資料庫相關
app.config['SECRET_KEY'] = 'Fianna'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:12345678@localhost:3306/userdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)

# 定義ORM物件
class User(db.Model):
    __tablename__ = 'tbl_user'
    user_id = db.Column(db.Integer, nullable=False,
                        primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(45), nullable=True)
    user_email = db.Column(db.String(45), nullable=True)
    user_password = db.Column(db.String(45), nullable=True)
    def __init__(self, username, useremail, userpassword=""):
        self.user_name=username
        self.user_email=useremail
        self.user_password=userpassword
    def __repr__(self):
        return '<User %r,user_id %r>' % (self.user_name, self.user_id)
class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('user_id', 'user_name', 'user_email', 'user_password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# endpoint to create new user
@app.route("/user", methods=["POST"])
def add_user():
    try:
        username = request.json['user_name']
        email = request.json['user_email']
        password= request.json['user_password']
        new_user = User(username, email,password)

        db.session.add(new_user)
        db.session.commit()
        return user_schema.jsonify(new_user)
        # resp = jsonify('User added successfully!')
        # resp.status_code = 200
        # return resp
    except Exception as e:
        print("Failed to add user")
        print(e)    

# endpoint to show all users
@app.route("/user", methods=["GET"])
def get_user():
    try:
        all_users = User.query.all()
        result = users_schema.dump(all_users)
        return jsonify(result.data)
    except Exception as e:
            print("Failed to get all user")
            print(e)    

# endpoint to get user detail  by id
@app.route("/user/<id>",methods=["GET"])
def user_detail(id):
    try:
        user = User.query.get(id)
        return user_schema.jsonify(user)
    except Exception as e:
        print("Failed to get user")
        print(e) 
# endpoint to update user
@app.route("/user/<id>", methods=["PUT"])
def user_update(id):
    try:
        user = User.query.get(id)
        username = request.json['user_name']
        email = request.json['user_email']
        password= request.json['user_password']
        user.user_name=  username
        user.user_email = email
        user.user_password = password
        db.session.commit()
        return user_schema.jsonify(user)        
    except Exception as e:
        print("Failed to update user")
        print(e) 
    
# endpoint to delete user
@app.route("/user/<id>", methods=["DELETE"])
def user_delete(id):
    try:
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return user_schema.jsonify(user)
    except:
        print("Failed to del user")
        print(e) 
	
if __name__ == "__main__":
    app.run(debug=False)
