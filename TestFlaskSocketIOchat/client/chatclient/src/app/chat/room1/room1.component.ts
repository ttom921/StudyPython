import { Component, OnInit } from '@angular/core';
import { SocketService } from "../services/socket.service";
import { Event } from "../model/event";

@Component({
  selector: 'app-room1',
  templateUrl: './room1.component.html',
  styleUrls: ['./room1.component.scss']
})
export class Room1Component implements OnInit {
  //SERVER_URL = "http://localhost:5000";
  //SERVER_URL = "http://192.168.83.128:5000";
  SERVER_URL = "http://192.168.83.128:5000";
  textValue = "";
  messages: string[] = [];
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    //this.initIoConnection(this.SERVER_URL);
  }
  private initIoConnection(nsspace: string) {
    // this.socketService.initSocket(nsspace);

    // this.socketService.onEvent(Event.CONNECT).subscribe(() => {
    //   console.log("[client] connedted");
    //   this.socketService.SendConnect();
    // });
    // this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
    //   console.log("[client] disconnedted");
    // });
    // this.socketService.Onchatmessage().subscribe((data) => {
    //   let fmtmsg = `[client ]<chatmessage> Message=${data}`;
    //   this.messages.push(fmtmsg);
    // });
  }
  public Sendchatmessage() {
    // // let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`
    // let fmtmsg = `[client]<chatmessage>=${this.textValue}`;
    // console.log(fmtmsg);
    // this.socketService.Sendchatmessage(this.textValue);
    // this.textValue = "";
  }


}
