from flask import Flask
from flask_redis import FlaskRedis


class RedisServer:
    app = None
    redis_client = None

    def __init__(self):
        pass

    def init_app(self, app):
        self.app = app
        self.redis_client = FlaskRedis(app)
        self.redis_client.init_app(app)
        self.Testdata()

    def Testdata(self):
        mykey = "mykey"
        self.redis_client.set(mykey, "mykeydata")
        # self.redis_client.get("mykey")
        print("redia->get->%s", self.redis_client.get(mykey))
        self.redis_client.delete(mykey)
        print("redia->get->%s", self.redis_client.get(mykey))


RedisServer = RedisServer()
print("###########################################################")
print("ChannelRedisServerServer id=", id(RedisServer))
