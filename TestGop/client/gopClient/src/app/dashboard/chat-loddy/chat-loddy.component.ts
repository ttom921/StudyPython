import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-chat-loddy',
  templateUrl: './chat-loddy.component.html',
  styleUrls: ['./chat-loddy.component.scss']
})
export class ChatLoddyComponent implements OnInit, AfterViewInit {

  channels: string[] = [];
  selected = "channel2";
  constructor(private snackBar: MatSnackBar, private socketService: PySocketioService) { }

  ngOnInit() {
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
  SendJoinChannel() {
    let strchannel = this.selected;
    this.socketService.Sendjoin({ channel: strchannel });
  }

}
