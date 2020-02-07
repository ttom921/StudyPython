import os
import urllib.request

from flask import Flask, request, redirect, jsonify, send_file
from werkzeug.utils import secure_filename
from flask_cors import CORS

UPLOAD_FOLDER = 'd:/uploads'

app = Flask(__name__)
# CORS問題
CORS(app)

app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# 檔案的大小
app.config['MAX_CONTENT_LENGTH'] = 256 * 1024 * 1024
# 可上傳的檔案類型
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS
# 檔案列表功能
@app.route('/files',defaults={'folder': None,'sub_folder': None}, methods=['GET'])
def files(folder,sub_folder):
    # print(request.environ['HTTP_ORIGIN'])
    basedir = app.config['UPLOAD_FOLDER']
    directory = ''
    if folder != None:
        directory = directory + '/' + folder
    if sub_folder != None:
        directory = directory + '/' + sub_folder    
    files = os.listdir(basedir + directory)  
    resp= jsonify({'fileslist' : files})  
    resp.status_code = 200
    return resp
# 上傳功能
@app.route('/file-upload',methods=['POST'])
def upload_file():
    # 檢查在post request是否有file的部分
    # print(request.files)
    if 'file' not in request.files:
        resp= jsonify({'message' : 'No file part in the request'})  
        resp.status_code = 400
        return resp
    # 取出檔案物件    
    file=   request.files['file'] 
    if file.filename == '':
        resp = jsonify({'message' : 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) 
        resp = jsonify({'message' : 'File successfully uploaded'})  
        resp.status_code = 200
        return resp
    else:
        resp = jsonify({'message' : 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
        resp.status_code = 400
        return resp
# 下載
@app.route('/file-download/<filename>',methods=['GET','POST'])
def downloadFile(filename):
    path= app.config['UPLOAD_FOLDER']+'/'+filename
    # print(path)
    resp = jsonify({'filename' : filename}) 
    resp.status_code = 200
    return send_file(path, as_attachment=True)  
if __name__ == "__main__":
    app.run(debug=False)
