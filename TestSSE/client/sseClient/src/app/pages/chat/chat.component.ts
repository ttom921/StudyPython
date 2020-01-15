import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  source: any = {};
  //url = "http://172.18.2.33:5000";
  url = "http://127.0.0.1:5000";
  channel = "api/stream";
  constructor() {
    // let sesurl = `${this.url}/${this.channel}`;
    // this.source = new EventSource(sesurl);
    // this.source.addEventListener('message', message => {
    //   //this.myData = JSON.parse(message.data);
    //   console.log(message);
    // });
    // // this.source.onmessage = function (event) {
    // //   console.log(event);
    // // }
    var evtSource = new EventSource("http://localhost:5000/stream");

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
