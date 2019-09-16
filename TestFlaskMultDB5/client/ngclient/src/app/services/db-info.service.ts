import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { DataBaseInfo } from '../models/database';

const httpOptionsjson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptions = {
  headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class DbInfoService {

  //選擇的資料庫
  public Seldbkey: string;

  // api address
  private userUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  // 取得所有的資料庫資訊
  public getDBInfos(): Observable<DataBaseInfo[]> {
    var api = this.userUrl + "/databaseproc";
    return this.http.get<DataBaseInfo[]>(api);
  }
  // 加入一個資料庫資料
  addDataBaseInfo(databaseinfo: DataBaseInfo): Observable<any> {
    var api = this.userUrl + "/databaseproc";
    const formData: FormData = new FormData();
    formData.append('dbkey', databaseinfo.dbkey);
    formData.append('dburl', databaseinfo.dburl);
    return this.http.post(api, formData, httpOptions);
  }
  // 刪除一個資料庫資料
  delDataBaseInfo(databaseinfo: DataBaseInfo): Observable<any> {
    //var api = this.userUrl + "/databaseproc/";
    var api = `${this.userUrl}/databaseproc/${databaseinfo.dbkey}`;

    return this.http.delete(api, httpOptionsjson);
  }
}
