import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { User } from './user';
import { Observable } from 'rxjs';
// import { map, filter, catchError, mergeMap } from 'rxjs/operators';


// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  // api address
  private userUrl = "http://localhost:5000";

  constructor(private http:HttpClient) { }
  // 取得所有的使用者
  // getUsers():any{
  //   var api = this.userUrl+"/user";
  //   return this.http.get<User[]>(api);
  // }
  getUsers():Observable<User[]>{
    var api = this.userUrl+"/user";
    return this.http.get<User[]>(api);
  }
}
