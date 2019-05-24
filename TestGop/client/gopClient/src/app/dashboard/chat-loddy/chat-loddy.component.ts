import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';

@Component({
  selector: 'app-chat-loddy',
  templateUrl: './chat-loddy.component.html',
  styleUrls: ['./chat-loddy.component.scss']
})
export class ChatLoddyComponent implements OnInit, AfterViewInit {

  channels: string[] = ["channel1", "channel2"];
  selected = "";
  constructor(private socketService: PySocketioService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    let curnamespace = this.socketService.getNameSpace();;
    //收到channel列表
    this.socketService.onupdateChannelList().subscribe(data => {
      let fmtmsg = `[client ns:${curnamespace}]<updateChannelList> ChannelList=${data.result}`;
      console.log(fmtmsg);
      this.channels = data.result;
    });
  }
}
