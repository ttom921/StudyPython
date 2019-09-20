import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  get name() {
    return this.data.iteminfo.name;
  }
  get username() {
    return this.data.iteminfo.username;
  }

  constructor(
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private userservice: UserService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
  }
  confirm() {
    this.delete(this.data.iteminfo);
  }
  delete(iteminfo) {
    //console.log(iteminfo);
    this.userservice.delUser(iteminfo).subscribe(res => {
      //console.log(res);
      this.dialogRef.close();
      this.toasterService.showToaster(res.message);
    }, error => {
      console.log(error);
      this.toasterService.showToaster(error.statusText);
      this.dialogRef.close();
    });
  }
}
