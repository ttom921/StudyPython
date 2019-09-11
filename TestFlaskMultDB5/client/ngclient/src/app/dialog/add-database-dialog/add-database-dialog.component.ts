import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataBaseInfo } from 'src/app/models/database';
import { ToasterService } from 'src/app/services/toaster.service';
import { DbInfoService } from 'src/app/services/db-info.service';

@Component({
  selector: 'app-add-database-dialog',
  templateUrl: './add-database-dialog.component.html',
  styleUrls: ['./add-database-dialog.component.scss']
})
export class AddDatabaseDialogComponent implements OnInit {
  public dbinof: DataBaseInfo = new DataBaseInfo();
  constructor(private dialogRef: MatDialogRef<AddDatabaseDialogComponent>,
    private dbinfoservice: DbInfoService,
    private dialog: MatDialog,
    private toasterService: ToasterService) { }

  ngOnInit() {

  }
  //加入database的資料
  Add() {
    //console.log(this.dbinof);
    this.dbinfoservice.addDataBaseInfo(this.dbinof).subscribe(
      data => {
        //console.log('success------------------' + data);
        //this.getDBInfos();
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
