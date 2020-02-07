// import { delay } from "rxjs/operators";
// 可以使用 TypeScript definitions
import axios from 'axios';

class Engine {
    //#region Singleton
    private static _instance: Engine;
    private constructor() { };
    public static getInstance(): Engine {
        if (this._instance == null) {
            this._instance = new Engine();
        }
        return this._instance;
    }
    //#endregion Singleton
    private _appid: string = "";

    init(appid: string) {
        //console.log('init');
        this._appid = appid;
    }
    showAppid() {
        console.log('appid=' + this._appid);
    }

    //取得檔案列表
    getFilelist(callback: (ent: any) => void) {
        axios.get('http://127.0.0.1:5000/files')
            .then((res) => {
                console.log(res.data);
                if (callback != null)
                    callback(res.data.fileslist)
            })
            .catch((err) => {
                // Error
                console.log(err);
                // Error 的詳細資訊
                console.log(err.response);
            })
    }
    //上傳
    upload(formdata: any, callback: (ent: any) => void) {
        //console.log(formdata);
        axios.post('http://127.0.0.1:5000/file-upload', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            transformRequest: [function (data) {
                return data;
            }],
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    console.log(percentage + '%');  // 上傳進度
                }
                if (callback != null) {
                    callback(percentage);
                }
            }
        })
            .then(res => {
                console.log(res.data);
            })
            ;
    }
    //下載
    download(dwfilename: any, callback: (ent: any) => void) {
        axios.get('http://127.0.0.1:5000/file-download/' + dwfilename, {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer', // 伺服器回應的數據類型
            transformRequest: [function (data) {
                return data;
            }],
            onDownloadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    //console.log(percentage + '%');  // 下載連度
                }
                if (callback != null) {
                    //callback(percentage);
                }
            }
        }).then(res => {
            console.log(res);
            let blob = new Blob([res.data]);
            let link = document.createElement("a");
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);
            link.href = URL.createObjectURL(blob);
            link.download = dwfilename;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(link.href);
        });
    }
}
export default Engine;
