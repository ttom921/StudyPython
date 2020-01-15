import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  source: any = {};
  api = `${environment.apiUrl}/stream`;
  constructor() {
    var evtSource = new EventSource(this.api);

    evtSource.onmessage = (e) => {
      console.log('connection message');
      console.log(e.data);
    }
    evtSource.onerror = (e) => {
      console.log('connection error');
      console.log(e);
      evtSource.close();
    }
    evtSource.onopen = (e) => {
      console.log('connection open');
      console.log(e);
    }
  }

  ngOnInit() {

  }

}
