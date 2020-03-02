import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  api = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }
  //送息給server
  Post(data) {
    this.api = `${environment.apiUrl}/messages`;
    return this.http.post<any>(this.api, data);
  }
  //取得sse的channel物件
  getEventSource(channel: string) {
    const source = new EventSource(`${environment.apiUrl}/stream?channel=${channel}`);
    return source;
  }
}
