
import json
from flask import Flask, request
from flask_socketio import SocketIO, Namespace, send, emit
from .clsns import MyCustomNamespace

# from flask_socketio import Namespace, emit
socketio = SocketIO()


class ChannelServer:
    app = None
    namespace_queue = []
    CustomNamespace = []

    def __init__(self):
        pass

    def init_app(self, app):
        self.app = app
        socketio.init_app(app, cors_allowed_origins="*")
        self.createClassNamepace("", True)
        # self.createClassNamepace("/")
        # self.createClassNamepace("/bb")

    def run(self, host=None, port=None, **kwargs):
        socketio(self.app, host=None, port=None, **kwargs)

    def getApp(self):
        return self.app

    def createNamespace(self, data, startup=False):
        if startup == False:
            currentSocketId = request.sid
            print("[server]<createNamespace> socket.id=%s nsname=%s" %
                  (currentSocketId, data))

        self.namespace_queue.append(data)
        if startup == False:
            self.sendUpdateNamespace()

    # 傳送namespace列表

    def sendUpdateNamespace(self):
        currentSocketId = request.sid
        senddata = {'result': self.namespace_queue}
        print("[server]<updateNamespaceList> socket.id=%s result=%s" %
              (currentSocketId, senddata))
        emit('updateNamespaceList', senddata, broadcast=True, json=True)
    # 檢查是否有namespace

    def searchObjectOnArray(self, namekey):
        for item in self.namespace_queue:
            if item == namekey:
                return item
        return None
    # 建立namespace的物件來處理網路事件

    def createClassNamepace(self, nsname, startup=False):
        self.createNamespace(nsname, startup)
        myclsns = MyCustomNamespace("/"+nsname)
        self.CustomNamespace.append(myclsns)
        socketio.on_namespace(myclsns)


channelsrv = ChannelServer()
MyCustomNamespace.ChatServer = channelsrv
# channelsrv.createclassnamspace("/bb")
