import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Event } from "../model/event";


@Component({
  selector: 'app-room1',
  templateUrl: './room1.component.html',
  styleUrls: ['./room1.component.scss']
})
export class Room1Component implements OnInit {
  SERVER_URL = "http://localhost:5000";
  constructor(private socketService: SocketService) { }
  textValue = "";
  messages: string[] = [];

  // nampscace相關
  textNamespace = "";
  namespacelst: string[] = [];
  seltextNamespace = "";
  curnamespace = "";
  ngOnInit() {
    this.initIoConnection(this.SERVER_URL);
  }
  private initIoConnection(nsspace: string) {
    this.socketService.InitSocket(nsspace);
    console.log("initIoConnection->" + nsspace);
    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      let fmtmsg = `[client ns:${this.curnamespace} ]connedted`;
      this.curnamespace = this.socketService.getNameSpace();
      console.log(fmtmsg);
      this.socketService.SendConnect();

    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("[client] disconnedted");

    });
    this.socketService.Onchatmessage().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace} ]<chatmessage> Message=${data}`;
      this.messages.push(fmtmsg);
    });

    this.socketService.OnUpdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      this.namespacelst = data.result;
    });

    // 加入新的namespace
    this.socketService.OnJoinToApp().subscribe((data) => {
      let connecturl = this.SERVER_URL + "/" + data.namespace;
      let fmtmsg = `[client ns:${this.curnamespace}]<JoinToApp> namespace=${connecturl}`;
      this.messages.push(fmtmsg);
      console.log(fmtmsg);
      this.socketService.disconnect();
      this.initIoConnection(connecturl);

    });
  }
  public Sendchatmessage() {
    // let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`
    let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`;
    console.log(fmtmsg);
    this.socketService.Sendchatmessage(this.textValue);
    this.textValue = "";
  }

  public createNamespace() {
    let fmtmsg = `[client ns:${this.curnamespace}]<createNamespace>=${this.textNamespace}`;
    console.log(fmtmsg);
    this.socketService.createNamespace(this.textNamespace);
  }
  // 加入選擇的namespace
  public joinToNamespace(): void {
    let fmtmsg = `[client ns:${this.curnamespace}]<JoinToApp>=${this.seltextNamespace}`
    console.log(fmtmsg);
    this.socketService.joinToNamespace(this.seltextNamespace);
  }


}
