import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';

@Component({
  selector: 'app-py-sender-lobby',
  templateUrl: './py-sender-lobby.component.html',
  styleUrls: ['./py-sender-lobby.component.scss']
})
export class PySenderLobbyComponent implements OnInit {
  clientclassname = this.constructor.name;
  curnamespace = "";
  //
  constructor(private socketService: PySocketioService) { }

  ngOnInit() {
    this.curnamespace = this.socketService.getNameSpace();

  }

}
