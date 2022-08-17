import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

interface Message {
  name: string; message: string; type: string;
}

interface MessageCount {
  messagecount: number; type: string;
}

@Component({
  selector: 'app-wsroom',
  templateUrl: './wsroom.component.html',
  styleUrls: ['./wsroom.component.scss']
})
export class WsroomComponent implements OnInit {

  SERVER_URL = "http://192.168.83.128:5000";

  messages: Message[] = [];
  name: string;
  message: string;
  numberOfMessages = 0;

  ws: WebSocketSubject<any>;
  message$: Observable<Message>;
  messageNumber$: Observable<MessageCount>;

  connected: boolean;

  constructor() { }

  ngOnInit() {
    this.connect();
  }
  connect() {
    // use wss:// instead of ws:// for a secure connection, e.g. in production
    this.ws = webSocket('ws://192.168.83.128:5000/echo'); // returns a WebSocketSubject

    //  split the subject into 2 observables, depending on object.type
    this.message$ = this.ws.multiplex(
      () => ({ subscribe: 'message' }),
      () => ({ unsubscribe: 'message' }),
      message => message.type === 'message'
    );

    this.messageNumber$ = this.ws.multiplex(
      () => ({ subscribe: 'messageNumber' }),
      () => ({ unsubscribe: 'messageNumber' }),
      message => message.type === 'messageNumber'
    );

    // subscribe to messages sent from the server
    this.message$.subscribe(
      value => this.messages.push(value),
      error => this.disconnect(error),
      () => this.disconnect()
    );

    // get the number of the messages from the server
    this.messageNumber$.subscribe(
      value => this.numberOfMessages = value.messagecount,
      error => this.disconnect(error),
      () => this.disconnect()
    );

    this.setConnected(true);
  }

  disconnect(err?) {
    if (err) { console.error(err); }
    this.setConnected(false);
    console.log('Disconnected');
  }

  sendMessage() {
    this.ws.next({ name: this.name, message: this.message, type: 'message' });
    this.message = '';
  }

  setConnected(connected) {
    this.connected = connected;
    this.messages = [];
  }
}
