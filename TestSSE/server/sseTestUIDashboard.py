# 這個程式是為了測試在StudyAngular9\TestUIDashboard裏的SSE
# 的動作和功能
from flask import Flask,Response,request, jsonify,json
from flask_sse import sse
import time
import redis
app = Flask(__name__)
#redis 路徑
red = redis.StrictRedis()
app.config["REDIS_URL"] = "redis://localhost"
# 
app.register_blueprint(sse,url_prefix='/api/stream')

@app.route("/api/messages",methods=['POST'])
def send_message():
    content = request.json
    channel=None
    message=None
    if(content!=None):
        channel=content['channel']
        message=content['message']
    #print(channel)
    sse.publish({"message":message},type='social',channel=channel)
    return jsonify({'code': 200, 'errmsg': 'success', 'data': None})
    #return Response(status=200, mimetype='application/json');

@app.route("/api/dvrpost",methods=['POST'])
def send_dvrmessage():
    content = request.json
    channel=None
    message=None
    if(content!=None):
        channel=content['channel']
        message=content['message']
    #print(channel)
    sse.publish({"message":message},type='dvr',channel=channel)
    return jsonify({'code': 200, 'errmsg': 'success', 'data': None})
    #return Response(status=200, mimetype='application/json');

@app.route('/')
def index():
    return Response(status=200, mimetype='application/json')
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=False,threaded=True) # 設定False才可以在vscode裏單步偵錯
