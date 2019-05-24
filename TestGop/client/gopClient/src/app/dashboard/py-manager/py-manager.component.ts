import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-py-manager',
  templateUrl: './py-manager.component.html',
  styleUrls: ['./py-manager.component.scss']
})
export class PyManagerComponent implements OnInit, AfterViewInit {

  curnamespace = "";
  nameSpacestr = "";
  namespacelst: string[] = [];
  constructor(private snackBar: MatSnackBar, private socketService: PySocketioService) { }

  ngOnInit() {
    console.log("PyManagerComponent:ngOnInit");
    this.curnamespace = this.socketService.getNameSpace();
    this.socketService.SendGetNamespacelst();
    this.socketService.SendGetChannellst();

  }
  ngAfterViewInit(): void {

    //收到namespace列表
    this.socketService.OnupdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      //this.socketIoDataService.setNameSpacelst(data.result);
      this.namespacelst = data.result;

    });
    //收到加入namespace
    this.socketService.OnjoinNamespace().subscribe(data => {

      let fmtmsg = `[client ns:${this.curnamespace}]<joinNamespace> namespacelst=${data.namespace}`;
      console.log(fmtmsg);
      fmtmsg = `已加人 ${data.namespace} 的namespce`;
      this.snackBar.open(fmtmsg, '我知道了',
        {
          duration: 2000
        });
      //切換到選擇的namespace
      let connecturl = environment.SERVER_URL + "/" + data.namespace;
      this.socketService.disconnect();
      this.socketService.initIoConnection(connecturl);
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
