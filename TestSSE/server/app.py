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
# def get_message():
#     '''this could be any function that blocks until data is ready'''
#     time.sleep(1.0)
#     s = time.ctime(time.time())
#     return s

# @app.route('/api/stream')
# def stream():
#     def eventStream():
#         while True:
#             timestamp = time.time() 
#             # wait for source data to be available, then push it
#             yield 'data: {}\n\n'.format(get_message())
#             yield 'event: ping\ndata: %d\n\n' % timestamp 
#     return Response(eventStream(), mimetype="text/event-stream")  
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

#!/usr/bin/env python
# import datetime
# import flask
# import redis


# app = flask.Flask(__name__)
# app.secret_key = 'asdf'
# red = redis.StrictRedis()


# def event_stream():
#     pubsub = red.pubsub()
#     pubsub.subscribe('chat')
#     # TODO: handle client disconnection.
#     for message in pubsub.listen():
#         print(message)
#         yield 'data: %s\n\n' % message['data']


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if flask.request.method == 'POST':
#         flask.session['user'] = flask.request.form['user']
#         return flask.redirect('/')
#     return '<form action="" method="post">user: <input name="user">'


# @app.route('/post', methods=['POST'])
# def post():
#     message = flask.request.form['message']
#     user = flask.session.get('user', 'anonymous')
#     now = datetime.datetime.now().replace(microsecond=0).time()
#     red.publish('chat', u'[%s] %s: %s' % (now.isoformat(), user, message))
#     return flask.Response(status=204)


# @app.route('/stream')
# def stream():
#     return flask.Response(event_stream(),
#                           mimetype="text/event-stream")


# @app.route('/')
# def home():
#     if 'user' not in flask.session:
#         return flask.redirect('/login')
#     return """
#         <!doctype html>
#         <title>chat</title>
#         <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
#         <style>body { max-width: 500px; margin: auto; padding: 1em; background: black; color: #fff; font: 16px/1.6 menlo, monospace; }</style>
#         <p><b>hi, %s!</b></p>
#         <p>Message: <input id="in" /></p>
#         <pre id="out"></pre>
#         <script>
#             function sse() {
#                 var source = new EventSource('/stream');
#                 var out = document.getElementById('out');
#                 source.onmessage = function(e) {
#                     // XSS in chat is fun
#                     out.innerHTML =  e.data + '\\n' + out.innerHTML;
#                 };
#             }
#             $('#in').keyup(function(e){
#                 if (e.keyCode == 13) {
#                     $.post('/post', {'message': $(this).val()});
#                     $(this).val('');
#                 }
#             });
#             sse();
#         </script>
#     """ % flask.session['user']


# if __name__ == '__main__':
#     app.run(host='0.0.0.0',debug=False) # 設定False才可以在vscode裏單步偵錯