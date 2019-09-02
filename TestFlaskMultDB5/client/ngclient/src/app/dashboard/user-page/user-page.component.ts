import { Component, OnInit } from '@angular/core';
import { DataBaseInfo } from 'src/app/models/database';
import { DbInfoService } from 'src/app/services/db-info.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  dblist: DataBaseInfo[] = [];
  //選擇的資料庫
  selectedDBkey:string;
  constructor(
    private dbinfoservice: DbInfoService,
    private userservice: UserService) { }
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
  onSubmit() {
    let fmt = `onSubmit:dbinof=${this.user}`;
    console.log(fmt);
    this.userservice.addUser(this.user).subscribe((res) => {
      console.log(res);
    });
  }
}
