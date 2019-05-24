import { Component, OnInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  curnamespace = "";
  textValue = "";
  messages: string[] = [];
  constructor(private socketService: PySocketioService) { }

  ngOnInit() {
    this.curnamespace = this.socketService.getNameSpace();
    this.socketService.Onchatmessage().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace} ]<chatmessage> Message=${data.msg}`;
      this.messages.push(fmtmsg);
    });
  }

  Sendchatmessage() {
    let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`;
    console.log(fmtmsg);
    let data = {
      channel: "channel2",
      msg: this.textValue
    }
    this.socketService.Sendchatmessage(data);
    this.textValue = "";
  }

}
