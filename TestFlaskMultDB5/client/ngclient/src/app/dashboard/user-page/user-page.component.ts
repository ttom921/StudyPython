import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBaseInfo } from 'src/app/models/database';
import { DbInfoService } from 'src/app/services/db-info.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/services/toaster.service';
import { MatPaginator, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from 'src/app/dialog/add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from 'src/app/dialog/delete-user-dialog/delete-user-dialog.component';
import { ModifyUserDialogComponent } from 'src/app/dialog/modify-user-dialog/modify-user-dialog.component';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  //分頁功能
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  totalCount: number = 0;
  pageSize = 2;
  pageSizeOptions: number[] = [2, 4, 6];
  private userUrl = "http://localhost:3000";

  dblist: DataBaseInfo[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private dialog: MatDialog,
    public dbinfoservice: DbInfoService,
    private userservice: UserService,
    private toasterService: ToasterService,
    private matPaginatorIntl: MatPaginatorIntl, ) { }
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
  reloaduser() {
    this.paginator.pageSize = this.pageSize;
    this.onDBSelection();
  }
  // 顯示加入使用者
  showAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      //console.log(res);
      this.reloaduser();
    });
  }
  // 顯示刪除的對話框
  showDeleteUserDialog(row) {
    //console.log(row);
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: {
        iteminfo: row
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      //console.log(res);
      this.reloaduser();
    });
  }
  //顯示修改的對話框
  showModifyUserDialog(row) {
    const dialogRef = this.dialog.open(ModifyUserDialogComponent, {
      data: {
        iteminfo: row
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      //console.log(res);
      this.reloaduser();
    });
  }
}
