import { Injectable } from '@angular/core';
import * as socketIo from "socket.io-client";
import { Observable, observable } from 'rxjs';
import { Event } from "../model/event";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: socketIo;
  constructor() { }
  public InitSocket(ns_url: string) {
    this.socket = socketIo(ns_url);
  }
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => { observer.next() });
    });
  }
  public SendConnect() {
    this.socket.emit("connected", "我已連線了");
  }
  public Sendchatmessage(msg: string) {
    this.socket.emit("chatmessage", msg);
  }
  public Onchatmessage(): Observable<string> {
    return new Observable<string>(observable => {
      this.socket.on("chatmessage", (data) => {
        observable.next(data);
      });
    });
  }
}
