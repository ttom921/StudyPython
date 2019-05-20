from flask import Flask

from channel.server import channelsrv
from flask_socketio import SocketIO

app = Flask(__name__)
# socketio = SocketIO(app, async_mode='gevent')
socketio = SocketIO(
    app, binary=True, http_compression=False, async_mode='gevent')
app.config['HOST'] = '0.0.0.0'
app.config['PORT'] = 3000
app.config["SECRET_KEY"] = "secret1"

channelsrv.init_app(app)


@app.route('/')
def index():
    return "hello Flask-SocketIO"


# @socketio.on("connect")
# def onconnect():
#     # socket id
#     currentSocketId = request.sid
#     # socketio namespace
#     print(request.namespace)
#     print("[server]<connect> socket.id=%s" % (currentSocketId))


# @socketio.on("connected")
# def onConnected(data):
#     currentSocketId = request.sid
#     print("[server]<connected> socket.id=%s msg=%s" %
#           (currentSocketId, data))


# @socketio.on("disconnect")
# def ondisconnect():
#     print("[server]<disconnect>")


# @socketio.on("chatmessage")
# def onchatmessage(data):
#     msg = "[server]<chatmessage>:%s" % (data)
#     print("[server]<chatmessage>:%s", msg)
#     ## emit("chatmessage", data)
#     ## emit("chatmessage", data, broadcast=True)
#     emit("chatmessage", data, broadcast=True, include_self=False)


if __name__ == '__main__':
    app.debug = False  # vscode 才可以偵錯
    # app.run(host='0.0.0.0', port=3000)
    socketio.run(app, host='0.0.0.0', port=3000)
