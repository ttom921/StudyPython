import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  lidatas = [];
  api = `${environment.apiUrl}/stream`;
  constructor(
    private chatService: ChatService,
  ) {
    const source = this.chatService.getEventSource("channel1");
    source.addEventListener('social', (event: MessageEvent) => {
      console.log(event.data);
      this.lidatas.push(event.data);
      //var data = JSON.parse(event.data);
    });
    source.addEventListener('error', (event: MessageEvent) => {
      console.log('reconnected service!')
    }, false);
  }

  ngOnInit() {


  }

}
