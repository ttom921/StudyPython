
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
        self.createNamespace("", True)
        # self.__createClassNamepace("", True)
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
        self.__createClassNamepace(data)

    def deleteNamespace(self, data, startup=False):
        if startup == False:
            currentSocketId = request.sid
            print("[server]<deleteNamespace> socket.id=%s nsname=%s" %
                  (currentSocketId, data))
        self.namespace_queue = [x for x in self.namespace_queue if x != data]
        # if startup == False:
        #     self.sendUpdateNamespace()
        self.__deleteClassNamepace(data)
    # 傳送namespace列表

    def sendUpdateNamespace(self):
        currentSocketId = request.sid
        # test_queue = []
        # test_queue.append("aaaa")
        # test_queue.append("bbb")
        # test_queue.append("ccc")
        # senddata = {'result': test_queue}
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

    def __createClassNamepace(self, nsname, startup=False):
        myclsns = MyCustomNamespace("/"+nsname)
        myclsns.ChatServer = self
        myclsns.ServerNameSpace = nsname
        self.CustomNamespace.append(myclsns)
        socketio.on_namespace(myclsns)
        print("[server]<createClassNamepace> myclsns.ServerNameSpace=%s CustomNamespace=%s" %
              (myclsns.ServerNameSpace, self.CustomNamespace))

    def __deleteClassNamepace(self, nsname, startup=False):
        self.CustomNamespace = [
            x for x in self.CustomNamespace if x.ServerNameSpace != nsname]
        print("[server]<deleteClassNamepace> CustomNamespace=%s" %
              (self.CustomNamespace))
        if startup == False:
            self.sendUpdateNamespace()


channelsrv = ChannelServer()
# MyCustomNamespace.ChatServer = channelsrv
# channelsrv.createclassnamspace("/bb")
