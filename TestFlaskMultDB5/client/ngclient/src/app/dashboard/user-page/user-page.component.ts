import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBaseInfo } from 'src/app/models/database';
import { DbInfoService } from 'src/app/services/db-info.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/services/toaster.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  //分頁功能
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  totalCount: number = 0;
  private userUrl = "http://localhost:3000";

  dblist: DataBaseInfo[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(
    public dbinfoservice: DbInfoService,
    private userservice: UserService,
    private toasterService: ToasterService,
    private http: HttpClient, ) { }
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
    // 分頁切換時，重新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      //console.log(`pageIndex=${page.pageIndex}:pageSize=${page.pageSize}`);
      this.getPages(page.pageIndex, page.pageSize);
    });
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
    this.getPages(0, 2);
    // this.userservice.getUsers(this.dbinfoservice.Seldbkey).subscribe(
    //   res => {
    //     //console.log(res);
    //     //this.dblist = res;
    //     this.dataSource.data = res;
    //     // //分頁功能
    //     this.totalCount = res.length;
    //     this.dataSource.paginator = this.paginator;
    //   },
    //   error => {
    //     console.log(error);
    //     this.toasterService.showToaster(error.statusText);
    //   }
    // );
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
  //分頁功能相關
  getPages(pageIndex, PageSize) {
    // this.http.get<any>(`https://jsonplaceholder.typicode.com/comments?_page=${pageIndex + 1}&_limit=${PageSize}`, { observe: 'response' }).subscribe(data => {
    //   this.totalCount = Number(data.headers.get('X-Total-Count'))
    //   console.log("this.totalCount=" + this.totalCount);
    // });

    // var api = `${this.userUrl}/user/${this.dbinfoservice.Seldbkey}?page=${pageIndex + 1}&limit=${PageSize}`;
    // this.http.get<any>(api, { observe: 'response' }).subscribe(
    //   resp => {
    //     console.log(resp.headers.get('X-Total-Count'));
    //     //console.log(resp.headers.get('AAAAAA'));
    //   }
    // );
    this.userservice.getUsers(this.dbinfoservice.Seldbkey, pageIndex, PageSize).subscribe(
      resp => {
        //console.log(res);
        this.dataSource.data = resp.body;
        // //分頁功能
        this.totalCount = Number(resp.headers.get('X-Total-Count'));
        //console.log(resp.headers.get('X-Total-Count'));
        // 從後端取得資料時，就不用指定data srouce的paginator了
        //this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
        this.toasterService.showToaster(error.statusText);
      }
    );
  }
}
