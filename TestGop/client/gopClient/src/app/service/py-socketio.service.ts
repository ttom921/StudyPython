import { Injectable } from '@angular/core';
import * as socketIo from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PySocketioService {
  private socket: socketIo;
  constructor() { }
  public InitSocket(ns_url: string) {
    this.socket = socketIo(ns_url, { upgrade: false, transports: ['websocket'] });
  }
  // 
  public disconnect(): void {
    this.socket.disconnect();
  }
  // 取得此socket連接的namespace
  public getNameSpace(): string {
    return this.socket.nsp;
  }
  //#region 收到訊息

  public Onconnect(): Observable<any> {
    return new Observable<any>((observable) => {
      this.socket.on("connect", () => { observable.next() });
    });
  }
  public Ondisconnect(): Observable<any> {
    return new Observable<any>((observable) => {
      this.socket.on("disconnect", () => { observable.next() });
    });
  }
  //收到NameSpace的列表
  public OnupdateNamespaceList(): Observable<any> {
    return new Observable<any>((observable) => {
      this.socket.on("updateNamespaceList", (data) => { observable.next(data) });
    });
  }
  public Onchatmessage(): Observable<string> {
    return new Observable<string>(observable => {
      this.socket.on("chatmessage", (data) => {
        observable.next(data);
      });
    });
  }
  //#endregion

  //#region 傳送訊息給server
  // 向server傳送已連線訊𠺒
  public Sendconnected() {
    this.socket.emit("connected", "我已連線了");
  }
  //#endregion
  //#region NameSpace相關
  //建立Namespace
  public createNamespace(nsname: string) {
    this.socket.emit("createNamespace", { name: nsname });
  }
  //#endregion



}
