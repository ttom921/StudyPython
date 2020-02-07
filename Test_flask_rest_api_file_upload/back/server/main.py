
import os
import urllib.request

from flask import Flask, request, redirect, jsonify,send_file
from werkzeug.utils import secure_filename
from flask_cors import CORS

UPLOAD_FOLDER = 'd:/uploads'

app = Flask(__name__)
CORS(app)

app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 256 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])


# serving some static html files
@app.route('/files', defaults={'folder': None,'sub_folder': None}, methods=['GET'])
def files(folder,sub_folder):
    basedir=app.config['UPLOAD_FOLDER']
    directory = ''
    if folder != None:
        directory = directory + '/' + folder
    if sub_folder != None:
        directory = directory + '/' + sub_folder
    files = os.listdir(basedir + directory)
    resp = jsonify({'filelist' : files}) 
    resp.status_code = 200
    return resp    

@app.route('/download/<filename>',methods=['GET', 'POST'])
def downloadFile (filename):
    # print("filename")
    path= app.config['UPLOAD_FOLDER']+'/'+filename
    print(path)
    return send_file(path, as_attachment=True)
    resp = jsonify({'filename' : filename}) 
    resp.status_code = 200
    return resp    
    # #For windows you need to use drive name [ex: F:/Example.pdf]
    # path = "/Examples.pdf"
    # return send_file(path, as_attachment=True)

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/file-upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    print("0")
    print(request.files)
    if 'files' not in request.files:
        # print("1")
        resp = jsonify({'message' : 'No file part in the request'})
        resp.status_code = 400
        return resp
    file = request.files['files']
    if file.filename == '':
        # print("2")
        resp = jsonify({'message' : 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
       # print("3")
       filename = secure_filename(file.filename)   
       # print('os.path={0}'.format(os.path))     
       file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) 
       resp = jsonify({'message' : 'File successfully uploaded'})  
       resp.status_code = 201  
       return resp
    else:
        # print("4")   
        resp = jsonify({'message' : 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'}) 
        resp.status_code = 400
        return resp

if __name__ == "__main__":
    app.run(debug=False)
