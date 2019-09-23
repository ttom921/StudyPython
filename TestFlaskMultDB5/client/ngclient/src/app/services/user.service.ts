import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { DbInfoService } from './db-info.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', })
// };
// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
// };

const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptions = {
  headers: new HttpHeaders({ 'enctype': 'multipart/form-data' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "http://localhost:3000";
  constructor(
    private http: HttpClient,
    private dbinfoservice: DbInfoService) { }
  // 取得所有的使用者
  getUsers(dbkey, pageIndex, pageSize): Observable<HttpResponse<User[]>> {
    var api = `${this.userUrl}/user/${dbkey}?page=${pageIndex + 1}&limit=${pageSize}`;
    return this.http.get<User[]>(api, { observe: 'response' });
  }
  // 加入一個使用者
  addUser(user: User): Observable<any> {
    var api = this.userUrl + "/user";
    const formData: FormData = new FormData();
    formData.append('dbkey', this.dbinfoservice.Seldbkey);
    formData.append('name', user.name);
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.http.post(api, formData, httpOptions);
  }
  //刪除一個使用者
  delUser(user: User): Observable<any> {
    //var api = this.userUrl + "/user/${databaseinfo.dbkey}";
    var api = `${this.userUrl}/user/${this.dbinfoservice.Seldbkey}/${user.id}`;
    return this.http.delete(api, httpOptionsJson);
  }
  //修改一個使用者
  modify(user: User): Observable<any> {
    var api = `${this.userUrl}/user/${user.id}`;
    const formData: FormData = new FormData();
    formData.append('dbkey', this.dbinfoservice.Seldbkey);
    formData.append('name', user.name);
    formData.append('username', user.username);
    formData.append('password', user.password);
    return this.http.put(api, formData, httpOptions);
  }

}
