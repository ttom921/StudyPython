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
    //const conn = socket(host, { upgrade: false, transports: ['websocket'] })
    //this.socket = socketIo(ns_url);
    this.socket = socketIo(ns_url, { upgrade: false, transports: ['websocket'] });
  }
  public disconnect(): void {
    this.socket.disconnect();
  }
  public getNameSpace(): string {
    return this.socket.nsp;
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
  public createNamespace(nsname: string) {
    this.socket.emit("createNamespace", { name: nsname });
  }
  public OnUpdateNamespaceList(): Observable<any> {
    return new Observable<any>(observable => {
      this.socket.on("updateNamespaceList", (data: any) => observable.next(data));
    });
  }
  // 加入選擇的namespace
  public joinToNamespace(nsname: string): void {
    this.socket.emit("JoinToApp", { namespace: nsname });
  }
  public OnJoinToApp(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("JoinToApp", (data: any) => observer.next(data));
    });
  }
  // bytemessage相關
  public Sendbytemessage(data: any) {
    this.socket.emit("bytemessage", data);
  }
  public Onbytemessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("bytemessage", (data: any) => observer.next(data));
    });
  }
}
