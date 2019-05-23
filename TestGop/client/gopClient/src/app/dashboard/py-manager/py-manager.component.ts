import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';
import { SocketIoDataService } from 'src/app/service/socket-io-data.service';

@Component({
  selector: 'app-py-manager',
  templateUrl: './py-manager.component.html',
  styleUrls: ['./py-manager.component.scss']
})
export class PyManagerComponent implements OnInit, AfterViewInit {


  nameSpacestr = "";
  namespacelst: string[] = ["aaa", "bbb", "ccc"];
  constructor(private socketService: PySocketioService, private socketIoDataService: SocketIoDataService) { }

  ngOnInit() {
    this.namespacelst = this.socketIoDataService.getNameSpacelst();
  }
  ngAfterViewInit(): void {


  }
  // 建立namespace
  public createNameSpace() {
    this.socketService.createNamespace(this.nameSpacestr);
  }

}
