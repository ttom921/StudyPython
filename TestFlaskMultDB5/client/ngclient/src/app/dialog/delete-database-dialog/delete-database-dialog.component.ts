import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DbInfoService } from 'src/app/services/db-info.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-delete-database-dialog',
  templateUrl: './delete-database-dialog.component.html',
  styleUrls: ['./delete-database-dialog.component.scss']
})
export class DeleteDatabaseDialogComponent implements OnInit {
  get dbkey() {
    return this.data.dbinfo.dbkey;
  }
  get dburl() {
    return this.data.dbinfo.dburl;
  }
  constructor(
    private dbinfoservice: DbInfoService,
    private toasterService: ToasterService,
    private dialogRef: MatDialogRef<DeleteDatabaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }
  public confirm() {

    this.delete(this.data.dbinfo);
  }
  delete(dbinfo) {
    //console.log(dbinfo);
    this.dbinfoservice.delDataBaseInfo(dbinfo).subscribe(res => {
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
