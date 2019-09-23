import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-modify-user-dialog',
  templateUrl: './modify-user-dialog.component.html',
  styleUrls: ['./modify-user-dialog.component.scss']
})
export class ModifyUserDialogComponent implements OnInit {
  get name() {
    return this.data.iteminfo.name;
  }
  get username() {
    return this.data.iteminfo.username;
  }
  constructor(
    private dialogRef: MatDialogRef<ModifyUserDialogComponent>,
    private userservice: UserService,
    private toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
  }
  confirm() {
    this.modify(this.data.iteminfo);
  }
  modify(iteminfo) {
    this.userservice.modify(iteminfo).subscribe(res => {
      //console.log(res);
      this.dialogRef.close();
      this.toasterService.showToaster(res.message);
    }, error => {
      console.log(error);
      this.dialogRef.close();
      this.toasterService.showToaster(error.statusText);

    });

  }
}
