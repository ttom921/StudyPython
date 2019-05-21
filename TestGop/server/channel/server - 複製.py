
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
        socketio.init_app(app)
        self.createClassNamepace("/")
        self.createClassNamepace("/bb")

    def getApp(self):
        return self.app

#     def run(self, parameter_list):
#         socketio.run(parameter_list)
    def onConnect(self):
        # socket id
        currentSocketId = request.sid
        sckns = request.namespace
        # socketio namespace
        # print(request.namespace)
        print("[server]<connect ns=%s > socket.id=%s" %
              (sckns, currentSocketId))

    def onDisconnect(self):
        print("[server]<disconnect>")

    def onConnected(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        print("[server]<connected ns=%s> socket.id=%s msg=%s" %
              (sckns, currentSocketId, data))
        # 送nampspace𦕁表
        self.sendUpdateNamespace()

    def onChatmessage(self, data):
        msg = "[server]<chatmessage>:%s" % (data)
        print("[server]<chatmessage>:%s", msg)
        # emit("chatmessage", data)
        emit("chatmessage", data, broadcast=True)
        # emit("chatmessage", data, broadcast=True, include_self=False)

    def oncreateNamespace(self, data):
        self.createNamespace(data)
##

    def createNamespace(self, data):
        currentSocketId = request.sid
        print("[server]<createNamespace> socket.id=%s nsname=%s" %
              (currentSocketId, data["name"]))

        self.namespace_queue.append(data["name"])
        self.sendUpdateNamespace()
        # myclsns = MyCustomNamespace(data["name"])
        # self.CustomNamespace.append(myclsns)
        # socketio.on_namespace(myclsns)
        return data
    # 傳送namespace列表

    def sendUpdateNamespace(self):
        currentSocketId = request.sid
        senddata = {'result': self.namespace_queue}
        print("[server]<updateNamespaceList> socket.id=%s result=%s" %
              (currentSocketId, senddata))
        emit('updateNamespaceList', senddata, broadcast=True, json=True)

    def onJoinToApp(self, data):
        namespaceToConnect = self.searchObjectOnArray(data["namespace"])
        if namespaceToConnect != None:
            sendmsg = {"namespace": namespaceToConnect}
            emit('JoinToApp', sendmsg, broadcast=True, json=True)

    def searchObjectOnArray(self, namekey):
        for item in self.namespace_queue:
            if item == namekey:
                return item
        return None

    def createClassNamepace(self, nsname):
        myclsns = MyCustomNamespace(nsname)
    #     # CustomNamespace.append(myclsns)
        socketio.on_namespace(myclsns)


channelsrv = ChannelServer()
# myclsns = MyCustomNamespace("/bb")
# socketio.on_namespace(myclsns)

# channelsrv.createclassnamspace("/bb")


# def on_connect():
#     sckns = request.namespace
#     print("********connect******************"+sckns)
#     print("********connect******************")


# socketio.on_event('connect', on_connect, namespace="/bb")
# 連線處理
# @socketio.on("connect")
# def onConnect():
#     channelsrv.onConnect()


@socketio.on("disconnect")
def onDisconnect():
    channelsrv.onDisconnect()


@socketio.on("connected")
def onConnected(data):
    channelsrv.onConnected(data)


@socketio.on("chatmessage")
def onChatmessage(data):
    channelsrv.onChatmessage(data)


@socketio.on("createNamespace")
def oncreateNamespace(data):
    channelsrv.oncreateNamespace(data)

# 加入選擇的namespace
@socketio.on("JoinToApp")
def onJoinToApp(data):
    channelsrv.onJoinToApp(data)
