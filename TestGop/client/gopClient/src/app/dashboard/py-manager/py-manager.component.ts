import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-py-manager',
  templateUrl: './py-manager.component.html',
  styleUrls: ['./py-manager.component.scss']
})
export class PyManagerComponent implements OnInit, AfterViewInit {


  nameSpacestr = "";
  namespacelst: string[] = [];
  constructor(private snackBar: MatSnackBar, private socketService: PySocketioService) { }

  ngOnInit() {
    console.log("PyManagerComponent:ngOnInit");
  }
  ngAfterViewInit(): void {
    let curnamespace = this.socketService.getNameSpace();;
    //收到namespace列表
    this.socketService.OnupdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      //this.socketIoDataService.setNameSpacelst(data.result);
      this.namespacelst = data.result;

    });
    //收到加入namespace
    this.socketService.OnjoinNamespace().subscribe(data => {
      let fmtmsg = `[client ns:${curnamespace}]<joinNamespace> namespacelst=${data.namespace}`;
      console.log(fmtmsg);
      fmtmsg = `已加人 ${data.namespace} 的namespce`;
      this.snackBar.open(fmtmsg, '我知道了',
        {
          duration: 2000
        });
    });

  }
  // 建立namespace
  public createNameSpace() {
    this.socketService.createNamespace(this.nameSpacestr);
  }
  public deleteNameSpace(ns: string) {
    this.socketService.deleteNameSpace(ns);

  }
  public joinNameSpace(ns: string) {
    this.socketService.joinNameSpace(ns);
  }
}
