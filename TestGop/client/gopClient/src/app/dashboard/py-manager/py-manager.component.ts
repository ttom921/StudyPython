import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';

@Component({
  selector: 'app-py-manager',
  templateUrl: './py-manager.component.html',
  styleUrls: ['./py-manager.component.scss']
})
export class PyManagerComponent implements OnInit, AfterViewInit {


  nameSpacestr = "";
  namespacelst: string[] = [];
  constructor(private socketService: PySocketioService) { }

  ngOnInit() {
    console.log("PyManagerComponent:ngOnInit");
  }
  ngAfterViewInit(): void {
    let curnamespace = "aaaaaaa";
    //收到namespace列表
    this.socketService.OnupdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      //this.socketIoDataService.setNameSpacelst(data.result);
      this.namespacelst = data.result;

    });

  }
  // 建立namespace
  public createNameSpace() {
    this.socketService.createNamespace(this.nameSpacestr);
  }
  public deleteNameSpace(ns: string) {
    this.socketService.deleteNameSpace(ns);
  }
}
