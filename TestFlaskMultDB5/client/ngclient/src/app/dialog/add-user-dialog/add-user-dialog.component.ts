import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  user: User = new User();
  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userservice: UserService,
    private toasterService: ToasterService) { }

  ngOnInit() {
  }
  // 加入使用者
  Add() {
    //console.log(this.dbinof);
    this.userservice.addUser(this.user).subscribe(
      data => {
        //console.log('success------------------' + data);
        this.toasterService.showToaster(data.message);
        this.dialogRef.close();
      },
      error => {
        console.log(error);
        this.toasterService.showToaster(error.error.message);
        //this.toasterService.showToaster(error.error.message);
        this.dialogRef.close();
      }
    );
  }
}
