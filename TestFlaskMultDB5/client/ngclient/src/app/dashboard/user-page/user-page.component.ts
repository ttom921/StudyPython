import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBaseInfo } from 'src/app/models/database';
import { DbInfoService } from 'src/app/services/db-info.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/services/toaster.service';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
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
    private matPaginatorIntl: MatPaginatorIntl, ) { }
  user: User = new User();
  ngOnInit() {
    this.getDBInfos();

    // 分頁切換時，重新取得資料
    this.paginator.page.subscribe((page: PageEvent) => {
      //console.log(`pageIndex=${page.pageIndex}:pageSize=${page.pageSize}`);
      this.getPages(page.pageIndex, page.pageSize);
    });
    // 設定顯示筆數資訊文字
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共  ${length} 筆`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const ednIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `第 ${startIndex + 1} - ${ednIndex} 筆、共  ${length} 筆`
    };
    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }
  getDBInfos() {
    //console.log('getDBInfos------------------');
    // //curdblist = [];
    this.dbinfoservice.getDBInfos().subscribe((res) => {

      //console.log(res);
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
  }
  onSubmit() {
    //let fmt = `onSubmit:dbinof=${this.user}`;
    //console.log(fmt);
    this.userservice.addUser(this.user).subscribe(
      (res) => {
        console.log(res);
        this.onDBSelection();
      });
  }
  //分頁功能相關
  getPages(pageIndex, PageSize) {
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
