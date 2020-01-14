import os
from flask import Flask, render_template
from flask_sse import sse
from flask_redis import FlaskRedis

app = Flask(__name__)
#app.config["REDIS_URL"] = "redis://localhost"
app.config["REDIS_URL"] = "redis://localhost:6379/0"
redis_client = FlaskRedis(app)
print("redis config")
print(app.config["REDIS_URL"])
app.register_blueprint(sse, url_prefix='/stream')

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/hello')
def publish_hello():
    sse.publish({"message": "Hello!"}, type='greeting')
    return "Message sent!"