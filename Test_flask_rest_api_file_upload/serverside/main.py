
from flask import Flask, request, redirect, jsonify

app = Flask(__name__)

@app.route('/')
def hellworld():
    return "hello world"

if __name__ == "__main__":
    app.run(debug=False)
