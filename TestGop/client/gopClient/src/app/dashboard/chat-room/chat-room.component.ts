import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  providers: [PySocketioService]
})
export class ChatRoomComponent implements OnInit, AfterViewInit {
  clientclassname = this.constructor.name;
  @Input() socketiourl: string;
  channels: string[] = [];
  selected = "channel1";
  curnamespace = "";
  textValue = "";
  messages: string[] = [];
  constructor(private snackBar: MatSnackBar, private socketService: PySocketioService) { }

  ngOnInit() {
    //this.clientclassname = this.constructor.name;
    //切換到選擇的namespace
    let myurl = this.socketiourl === "/" ? "" : "/" + this.socketiourl;
    let connecturl = environment.SERVER_URL;// + "/" + this.socketiourl;
    //this.socketService.disconnect();
    this.socketService.initIoConnection(connecturl);

    this.curnamespace = this.socketService.getNameSpace();
    this.socketService.Onchatmessage().subscribe((data) => {
      let fmtmsg = `${this.clientclassname}->[client ns:${this.curnamespace} ]<chatmessage> Message=${data.msg}`;
      this.messages.push(fmtmsg);
    });
    //要求頻道列表
    this.socketService.SendGetChannellst();
  }
  ngAfterViewInit(): void {
    this.curnamespace = this.socketService.getNameSpace();
    //收到channel列表
    this.socketService.onupdateChannelList().subscribe(data => {
      let fmtmsg = `${this.clientclassname}->[client ns:${this.curnamespace}]<updateChannelList> ChannelList=${data.result}`;
      console.log(fmtmsg);
      this.channels = data.result;
    });
    this.socketService.Onjoin().subscribe(data => {
      let fmtmsg = `${this.clientclassname}->[client ns:${this.curnamespace}]<join> data=${data.channel}`;
      console.log(fmtmsg);
      fmtmsg = `已加人 ${data.channel} 的頻道`;
      this.snackBar.open(fmtmsg, '我知道了',
        {
          duration: 2000
        });
    });
  }
  Sendchatmessage() {
    let fmtmsg = `${this.clientclassname}->[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`;
    console.log(fmtmsg);
    let data = {
      channel: this.selected,
      msg: this.textValue
    }
    this.socketService.Sendchatmessage(data);
    this.textValue = "";
  }
  SendJoinChannel() {
    let data = {
      channel: this.selected
    }
    this.socketService.Sendjoin(data);
  }
}
