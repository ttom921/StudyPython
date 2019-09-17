import { Component, OnInit } from '@angular/core';
import { DataBaseInfo } from 'src/app/models/database';
import { DbInfoService } from 'src/app/services/db-info.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  dblist: DataBaseInfo[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(
    public dbinfoservice: DbInfoService,
    private userservice: UserService,
    private toasterService: ToasterService) { }
  user: User = new User();
  ngOnInit() {
    // var database1 = new DataBaseInfo();
    // database1.dbkey = "dbkey";
    // database1.dburl = "dburl";
    // this.dblist.push(database1);
    // var database2 = new DataBaseInfo();
    // database2.dbkey = "dbkey2";
    // database2.dburl = "dburl2";
    // this.dblist.push(database2);
    this.getDBInfos();
  }
  getDBInfos() {
    //console.log('getDBInfos------------------');
    // //curdblist = [];
    this.dbinfoservice.getDBInfos().subscribe((res) => {

      console.log(res);
      res.forEach(item => {
        //console.log(item);
        if (item.dbkey == "") {
          item.dbkey = "default"
        }
      });
      this.dblist = res;
    });
  }
  onDBSelection() {
    let fmt = `onDBSelection:Seldbkey=${this.dbinfoservice.Seldbkey}`;
    console.log(fmt);
    this.userservice.getUsers(this.dbinfoservice.Seldbkey).subscribe(
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
  onSubmit() {
    let fmt = `onSubmit:dbinof=${this.user}`;
    console.log(fmt);
    this.userservice.addUser(this.user).subscribe(
      (res) => {
        console.log(res);
        this.onDBSelection();
      });
  }
}
