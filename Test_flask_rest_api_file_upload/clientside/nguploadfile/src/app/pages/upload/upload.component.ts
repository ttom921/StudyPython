import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from 'src/app/_services/fw/upload.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }
  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            //console.log(event);
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`)
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        const file = event.target.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    }
  }
  onClick() {
    // const fileUpload = this.fileUpload.nativeElement;
    // for (let index = 0; index < fileUpload.files.length; index++) {
    //   const file = fileUpload.files[index];
    //   this.files.push({ data: file, inProgress: false, progress: 0 });
    // }
    // fileUpload.onchange = () => {
    //   for (let index = 0; index < fileUpload.files.length; index++) {
    //     const file = fileUpload.files[index];
    //     this.files.push({ data: file, inProgress: false, progress: 0 });
    //   }
    // }
    // fileUpload.click();
  }

}
