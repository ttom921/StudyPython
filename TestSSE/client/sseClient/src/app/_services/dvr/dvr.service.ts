import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DVRService {
  api = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }
  //送息給server
  Post(data) {
    this.api = `${environment.apiUrl}/dvrpost`;
    return this.http.post<any>(this.api, data);
  }
  //取得sse的channel物件
  getEventSource(channel: string) {
    const source = new EventSource(`${environment.apiUrl}/stream?channel=${channel}`);
    return source;
  }

  base64(str) {
    return btoa(encodeURIComponent(str));
  }
  decodebase64(tmp) {
    return decodeURIComponent(atob(tmp));
  }
}
