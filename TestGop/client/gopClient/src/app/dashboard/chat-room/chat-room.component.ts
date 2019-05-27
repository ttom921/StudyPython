import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, AfterViewInit {

  channels: string[] = [];
  selected = "channel2";
  curnamespace = "";
  textValue = "";
  messages: string[] = [];
  constructor(private snackBar: MatSnackBar, private socketService: PySocketioService) { }

  ngOnInit() {
    this.curnamespace = this.socketService.getNameSpace();
    this.socketService.Onchatmessage().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace} ]<chatmessage> Message=${data.msg}`;
      this.messages.push(fmtmsg);
    });
    //要求頻道列表
    this.socketService.SendGetChannellst();
  }
  ngAfterViewInit(): void {
    let curnamespace = this.socketService.getNameSpace();
    //收到channel列表
    this.socketService.onupdateChannelList().subscribe(data => {
      let fmtmsg = `[client ns:${curnamespace}]<updateChannelList> ChannelList=${data.result}`;
      console.log(fmtmsg);
      this.channels = data.result;
    });
    this.socketService.Onjoin().subscribe(data => {
      let fmtmsg = `[client ns:${curnamespace}]<join> data=${data.channel}`;
      console.log(fmtmsg);
      fmtmsg = `已加人 ${data.channel} 的頻道`;
      this.snackBar.open(fmtmsg, '我知道了',
        {
          duration: 2000
        });
    });
  }
  Sendchatmessage() {
    let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`;
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
