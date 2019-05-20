import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Event } from "../model/event";
import { ImagefileService } from 'src/app/services/imagefile.service';
import { environment } from "src/environments/environment";
import { from } from 'rxjs';

@Component({
  selector: 'app-char-room',
  templateUrl: './char-room.component.html',
  styleUrls: ['./char-room.component.scss']
})
export class CharRoomComponent implements OnInit, AfterViewInit {

  //SERVER_URL = "http://localhost:3000";
  // SERVER_URL = "http://172.18.2.7:3000";
  textValue = "";
  messages: string[] = [];
  // nampscace相關
  textNamespace = "";
  namespacelst: string[] = [];
  seltextNamespace = "";
  curnamespace = "";
  @ViewChild("photoImage") photoImage: ElementRef;

  constructor(private socketService: SocketService, private imagefileService: ImagefileService) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    let value = Math.random() * 800;
    setTimeout(() => {
      this.initIoConnection(environment.SERVER_URL);
    }, value);
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
      let fmtmsg = `[client ns:${this.curnamespace} ]<onchatmessage> Message=${data}`;
      console.log(fmtmsg);
      this.messages.push(fmtmsg);
    });
    this.socketService.OnUpdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      this.namespacelst = data.result;
    });
    // 收到bytemessage
    this.socketService.Onbytemessage().subscribe((data) => {
      //let fmtmsg = `[client ns:${this.curnamespace}]<bytemessage> data.bufdata=${data.bufdata}`;
      let fmtmsg = `[client ns:${this.curnamespace}]<bytemessage> `;
      //console.log(fmtmsg);

      let blob = new Blob([data], { type: "image/jpeg" });
      let urlCreator = window.URL;
      this.photoImage.nativeElement.src = urlCreator.createObjectURL(blob)
      data = null;

    });

  }
  public Sendchatmessage() {
    // let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`
    let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`;
    console.log(fmtmsg);
    this.socketService.Sendchatmessage(this.textValue);
    this.textValue = "";
  }
  // 加入選擇的namespace
  public joinToNamespace(): void {
    let fmtmsg = `[client ns:${this.curnamespace}]<JoinToApp>=${this.seltextNamespace}`
    console.log(fmtmsg);
    this.socketService.joinToNamespace(this.seltextNamespace);
  }

  public btnConn() {
    this.initIoConnection(environment.SERVER_URL);
  }

}
