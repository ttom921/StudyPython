from flask import Flask, request
from flask_socketio import SocketIO, Namespace, send, emit


class MyCustomNamespace(Namespace):
    ChatServer = None
    # 客戶connect的事件

    def on_connect(self):
        sckns = request.namespace
        fmt = "[myns ns=%s]<connect>" % (sckns)
        print(fmt)
        self.sendUpdateNamespace()
    # 客戶disconnect的事件

    def on_disconnect(self):
        sckns = request.namespace
        fmt = "[myns ns=%s]<disconnect>" % (sckns)
        print(fmt)
    # 客戶已連線connected的事件

    def on_connected(self, data):
        # socket id
        currentSocketId = request.sid
        sckns = request.namespace
        fmt = "[myns ns=%s]<connected> socket.id=%s msg=%s" % (
            sckns, currentSocketId, data)
        print(fmt)
    # 聊天chatmessage的事件

    def on_chatmessage(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        fmt = "[myns ns=%s]<chatmessage>:%s" % (sckns, data)
        print(fmt)
        # emit("chatmessage", data)
        emit("chatmessage", data, broadcast=True)
        # emit("chatmessage", data, broadcast=True, include_self=False)
    # 建立createNamespace的事件

    def on_createNamespace(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        print("[myns ns=%s]<createNamespace> socket.id=%s nsname=%s" %
              (sckns, currentSocketId, data["name"]))
        self.ChatServer.createClassNamepace(data["name"])

    # 傳送namespace列表

    def sendUpdateNamespace(self):
        currentSocketId = request.sid
        sckns = request.namespace
        senddata = {'result': self.ChatServer.namespace_queue}
        print("[myns ns=%s]<updateNamespaceList> socket.id=%s result=%s" %
              (sckns, currentSocketId, senddata))
        emit('updateNamespaceList', senddata, broadcast=True, json=True)
    # 加入JoinToApp事件加入某個namespace

    def on_JoinToApp(self, data):
        namespaceToConnect = self.ChatServer.searchObjectOnArray(
            data["namespace"])
        if namespaceToConnect != None:
            sendmsg = {"namespace": namespaceToConnect}
            emit('JoinToApp', sendmsg, json=True)

    # 有關bytemessage
    def on_bytemessage(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        # fmt = "[myns ns=%s]<bytemessage>:%s" % (sckns, data)
        # print(fmt)
        # emit("chatmessage", data)
        emit("bytemessage", data, broadcast=True, json=True)
