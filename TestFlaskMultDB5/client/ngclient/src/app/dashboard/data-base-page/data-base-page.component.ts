import { Component, OnInit } from '@angular/core';
import { DbInfoService } from 'src/app/services/db-info.service';
import { DataBaseInfo } from 'src/app/models/database';
import { ToasterService } from 'src/app/services/toaster.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddDatabaseDialogComponent } from 'src/app/dialog/add-database-dialog/add-database-dialog.component';

@Component({
  selector: 'app-data-base-page',
  templateUrl: './data-base-page.component.html',
  styleUrls: ['./data-base-page.component.scss']
})
export class DataBasePageComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  totalCount: number;


  public dbinof: DataBaseInfo = new DataBaseInfo();
  dblist = [
    {
      dbkey: 'dbkey 1',
      dburl: 'dburl Subject 1',
    },
    {
      dbkey: 'dbkey 2',
      dburl: 'dburl Subject 2',
    },
  ]
  constructor(
    private dbinfoservice: DbInfoService,
    private dialog: MatDialog,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.getDBInfos();
  }
  onSubmit() {
    let fmt = `onSubmit:dbinof=${this.dbinof}`;
    console.log(fmt);
    //console.log('onSubmit------------------');
    // let fmt = `onSubmit:dbkey=${this.dbkey}->dburl=${this.dburl}`;
    // console.log(fmt);
    // let databaseinof = new DataBaseInfo()
    // databaseinof.dbkey = this.dbkey;
    // databaseinof.dburl = this.dburl;
    this.dbinfoservice.addDataBaseInfo(this.dbinof).subscribe(
      //   (res) => {
      //   console.log('onSubmit res------------------');
      //   console.log(res);
      //   this.getDBInfos();

      // }
      data => {
        console.log('success------------------' + data);
        this.getDBInfos();
        this.toasterService.showToaster(data.message);
      },
      error => {
        console.log(error);
        this.toasterService.showToaster(error.error.message);
        //this.toasterService.showToaster(error.error.message);
      }
    );
  }
  getDBInfos() {
    //console.log('getDBInfos------------------');
    // //curdblist = [];
    this.dbinfoservice.getDBInfos().subscribe(
      res => {
        console.log(res);
        this.dblist = res;
        this.dataSource.data = res;
      },
      error => {
        console.log(error);
        this.toasterService.showToaster(error.statusText);
      }
    );
  }
  shwoAddDataBaseDialog() {
    const dialogRef = this.dialog.open(AddDatabaseDialogComponent, {
      data: {
        id: "DLG_ADDDATABASE"
      }
    });

    // addDataBaseDialogRef.componentInstance.Add.subscribe(() => {
    //   console.log("add 被按下");
    // });
    dialogRef.afterClosed().subscribe(res => {
      console.log("對話框被關畢");
      console.log(res);
      //this.getDBInfos();
      location.reload();
    });
  }

}

