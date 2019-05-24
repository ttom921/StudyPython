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

  //curnamespace = "";
  // namespacelst: string[] = [];
  constructor(private socketService: PySocketioService) { }

  ngOnInit() {
    console.log("DashboardComponent:ngOnInit");
    this.socketService.initIoConnection(environment.SERVER_URL);
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
}
