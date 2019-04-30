import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // api address
  private userUrl = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  // 取得所有的使用者
  getUsers(): Observable<User[]> {
    var api = this.userUrl + "/user";
    return this.http.get<User[]>(api);
  }
  // 加入一個使用者
  addUser(user: User): Observable<User> {
    var api = this.userUrl + "/user";
    return this.http.post<User>(api, user, httpOptions);
  }
  // 取得一個使用者的資訊
  getUser(id: string):Observable<User>{
    var api = `${this.userUrl}/user/${id}`;
    //console.log(api);
    return this.http.get<User>(api);
  }
  // 編輯一個使用者的資訊
  updateUser(user:User):Observable<User>{
    var api = `${this.userUrl}/user/${user.user_id}`;
    return this.http.put<User>(api,user,httpOptions);

  }
  // 刪除一個使用者的資訊
  deleteUser(user:User):Observable<User>{
    var api = `${this.userUrl}/user/${user.user_id}`;
    return this.http.delete<User>(api);
  }
}
