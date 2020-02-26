import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirmWareService {
  api = "http://127.0.0.1:5000/file-upload";
  constructor(private http: HttpClient) { }
  Gets() {
    this.api = "http://127.0.0.1:5000/files";
    return this.http.get<any>(this.api);

  }
}
