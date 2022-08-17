import { Injectable } from '@angular/core';
//import * as socketIo from "socket.io-client";
//import * as io from 'socket.io-client';
import { Event } from "../model/event";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // private socket
  // constructor() { }
  // public initSocket(ns_url: string) {
  //   this.socket = socketIo(ns_url);
  // }
  // public onEvent(event: Event): Observable<any> {
  //   return new Observable<Event>(observer => {
  //     this.socket.on(event, () => observer.next());
  //   });
  // }
  // public SendConnect() {
  //   this.socket.emit("connected", "我已連線了");
  // }
  // public Sendchatmessage(msg: string): void {
  //   this.socket.emit("chatmessage", msg);
  // }
  // public Onchatmessage(): Observable<string> {
  //   return new Observable<string>(observer => {
  //     this.socket.on("chatmessage", (data: string) => {
  //       observer.next(data)
  //     });
  //   });
  // }
  // // public disconnect(){
  // //   this.socket.disconnect();
  // // }

}
