import { Component, OnInit } from '@angular/core';
import { DbInfoService } from 'src/app/services/db-info.service';
import { DataBaseInfo } from 'src/app/models/database';
import { ToasterService } from 'src/app/services/toaster.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddDatabaseDialogComponent } from 'src/app/dialog/add-database-dialog/add-database-dialog.component';
import { DeleteDatabaseDialogComponent } from 'src/app/dialog/delete-database-dialog/delete-database-dialog.component';

@Component({
  selector: 'app-data-base-page',
  templateUrl: './data-base-page.component.html',
  styleUrls: ['./data-base-page.component.scss']
})
export class DataBasePageComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  totalCount: number;


  public dbinof: DataBaseInfo = new DataBaseInfo();

  constructor(
    private dbinfoservice: DbInfoService,
    private dialog: MatDialog,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.getDBInfos();
  }
  getDBInfos() {
    //console.log('getDBInfos------------------');
    // //curdblist = [];
    this.dbinfoservice.getDBInfos().subscribe(
      res => {
        //console.log(res);
        //this.dblist = res;
        this.dataSource.data = res;
      },
      error => {
        console.log(error);
        this.toasterService.showToaster(error.statusText);
      }
    );
  }
  shwoAddDataBaseDialog() {
    const dialogRef = this.dialog.open(AddDatabaseDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      //console.log("對話框被關畢");
      //console.log(res);
      this.getDBInfos();
    });
  }
  // 顯示刪除的對話框
  showDeleteDialog(row) {
    console.log(row);
    const dialogRef = this.dialog.open(DeleteDatabaseDialogComponent, {
      data: {
        dbinfo: row
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      //console.log(res);
      this.getDBInfos();
    });
  }

}

