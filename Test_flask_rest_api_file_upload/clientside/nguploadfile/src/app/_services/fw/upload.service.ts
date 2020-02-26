import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  //api = `${environment.apiUrl}/servers`;
  //api = "https://file.io/";
  api = "http://127.0.0.1:5000/file-upload";
  constructor(private httpClient: HttpClient) { }
  upload(formData) {
    return this.httpClient.post<any>(this.api, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
