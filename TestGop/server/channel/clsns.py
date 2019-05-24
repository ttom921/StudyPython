from flask import Flask, request
from flask_socketio import SocketIO, Namespace, send, emit


class MyCustomNamespace(Namespace):
    ChatServer = None
    ServerNameSpace = None
    socketio = None
    # 客戶connect的事件

    def on_connect(self):
        sckns = request.namespace
        remotip = request.remote_addr
        fmt = "[myns ns=%s]<connect> remote_addr=%s" % (sckns, remotip)
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
        msg = data["msg"]
        curroom = data["channel"]
        fmt = "[myns ns=%s]<chatmessage>:%s" % (sckns, msg)
        print(fmt)

        # curroomdata = self.socketio.server.rooms(currentSocketId, sckns)
        # fmt = "[myns ns=%s]<chatmessage>:currroom=%s" % (sckns, curroomdata)
        # print(fmt)
        # curroom = ""
        # if len(curroomdata) > 1:
        #     curroom = curroomdata[1]
        emit("chatmessage", data, broadcast=True, room=curroom, namspace=sckns)
        # # emit("chatmessage", data)
        # emit("chatmessage", data, broadcast=True)
        # # emit("chatmessage", data, broadcast=True, include_self=False)
    # 建立createNamespace的事件

    def on_createNamespace(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        print("[myns ns=%s]<createNamespace> socket.id=%s nsname=%s" %
              (sckns, currentSocketId, data["name"]))
        self.ChatServer.createNamespace(data["name"])

    def on_deleteNamespace(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        print("[myns ns=%s]<deleteNamespace> socket.id=%s nsname=%s" %
              (sckns, currentSocketId, data["name"]))
        self.ChatServer.deleteNamespace(data["name"])

    def on_getnamespacelst(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        print("[myns ns=%s]<getnamespacelst> socket.id=%s data=%s" %
              (sckns, currentSocketId, data))
        self.sendUpdateNamespace()

    def on_getchannellst(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        print("[myns ns=%s]<getchannellst> socket.id=%s data=%s" %
              (sckns, currentSocketId, data))
        self.sendUpdateChannel()
    # 傳送namespace列表

    # 加入到指定的namespace

    def on_joinNamespace(self, data):
        namespaceToConnect = self.ChatServer.searchObjectOnArray(
            data["namespace"])
        if namespaceToConnect != None:
            sendmsg = {"namespace": namespaceToConnect}
            emit('joinNamespace', sendmsg, json=True)
            currentSocketId = request.sid
            sckns = request.namespace
            print("[myns ns=%s]<joinNamespace> socket.id=%s nsname=%s" %
                  (sckns, currentSocketId, namespaceToConnect))
            self.ChatServer.sendUpdateChannel()
# -------------------------------------------------------

    def sendUpdateNamespace(self):
        self.ChatServer.sendUpdateNamespace()
        # currentSocketId = request.sid
        # sckns = request.namespace
        # senddata = {'result': self.ChatServer.namespace_queue}
        # print("[myns ns=%s]<updateNamespaceList> socket.id=%s result=%s" %
        #       (sckns, currentSocketId, senddata))
        # emit('updateNamespaceList', senddata, broadcast=True, json=True)
    # 加入JoinToApp事件加入某個namespace

    def sendUpdateChannel(self):
        self.ChatServer.sendUpdateChannel()
    # def on_JoinToApp(self, data):
    #     namespaceToConnect = self.ChatServer.searchObjectOnArray(
    #         data["namespace"])
    #     if namespaceToConnect != None:
    #         sendmsg = {"namespace": namespaceToConnect}
    #         emit('JoinToApp', sendmsg, json=True)
# -------------------------------------------------------
    # 有關bytemessage

    def on_bytemessage(self, data):
        currentSocketId = request.sid
        sckns = request.namespace
        # fmt = "[myns ns=%s]<bytemessage>:%s" % (sckns, data)
        # print(fmt)
        # emit("chatmessage", data)
        #emit("bytemessage", data, broadcast=True, json=True)
        emit("bytemessage", data, broadcast=True)
# -------------------------------------------------------
    # 有關加入頻首

    def on_join(self, data):
        # username = data['username']
        channel = data['channel']
        sid = request.sid
        sckns = request.namespace
        self.socketio.server.enter_room(sid, channel, namespace=sckns)
        #self.socketio.join_room(channel, namespace=sckns)
        emit("join", data, broadcast=True, room=channel, namespace=sckns)

    def on_leave(self, data):
        # username = data['username']
        channel = data['channel']
        sid = request.sid
        sckns = request.namespace
        #self.socketio.leave_room(channel, namespace=sckns)
        self.socketio.server.leave_room(sid, channel, namespace=sckns)
        emit("leave", data, broadcast=True, room=channel, namespace=sckns)
