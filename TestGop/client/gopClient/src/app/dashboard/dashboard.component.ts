import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatSidenav, MatDrawerToggleResult } from '@angular/material';
import { PySocketioService } from '../service/py-socketio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  curnamespace = "";
  // namespacelst: string[] = [];
  constructor(private socketService: PySocketioService) { }

  ngOnInit() {
    console.log("DashboardComponent:ngOnInit");
    this.initIoConnection(environment.SERVER_URL);
  }
  toggleSideNav(sideNav: MatSidenav) {
    sideNav.toggle().then((result: MatDrawerToggleResult) => {
      console.log(result);
      console.log(`選單狀態:${result}`)
    });
  }
  opened() {
    console.log("芝麻開門");
  }
  closed() {
    console.log("芝麻關門");
  }

  ngAfterViewInit(): void {

  }
  initIoConnection(nsspace: string) {
    this.socketService.InitSocket(nsspace);
    console.log("initIoConnection->" + nsspace);
    this.socketService.Onconnect().subscribe(() => {
      this.curnamespace = this.socketService.getNameSpace();
      let fmtmsg = `[client ns:${this.curnamespace} ]connedted`;
      console.log(fmtmsg);
      this.socketService.Sendconnected();
    });

    // this.socketService.Ondisconnect().subscribe(() => {
    //   //this.socketIoDataService.setCurrentNameSpace(this.socketService.getNameSpace());
    //   let fmtmsg = `[client ns:${curnamespace} ]disconnedted`;
    //   console.log(fmtmsg);
    // });

    //收到namespace列表
    this.socketService.OnupdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      //this.socketIoDataService.setNameSpacelst(data.result);
      //this.namespacelst = data.result;

    });

  }

}
