import { Injectable } from '@angular/core';
import * as socketIo from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PySocketioService {
  curnamespace = "";
  private socket: socketIo;
  constructor() { }
  public InitSocket(ns_url: string) {
    this.socket = socketIo(ns_url, { upgrade: false, transports: ['websocket'] });
  }
  //
  initIoConnection(nsspace: string) {
    this.InitSocket(nsspace);
    console.log("initIoConnection->" + nsspace);
    this.Onconnect().subscribe(() => {
      this.curnamespace = this.getNameSpace();
      let fmtmsg = `[client ns:${this.curnamespace} ]connedted`;
      console.log(fmtmsg);
      this.Sendconnected();
    });

    //收到namespace列表
    this.OnupdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      //this.socketIoDataService.setNameSpacelst(data.result);
      //this.namespacelst = data.result;

    });

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
    return new Observable<any>((observer) => {
      this.socket.on("connect", () => { observer.next() });
    });
  }
  public Ondisconnect(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on("disconnect", () => { observer.next() });
    });
  }
  //收到NameSpace的列表
  public OnupdateNamespaceList(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on("updateNamespaceList", (data) => { observer.next(data) });
    });
  }
  //收到channel的列表
  public onupdateChannelList(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("updateChannelList", (data) => { observer.next(data) });
    });
  }
  public Onchatmessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on("chatmessage", (data) => {
        observer.next(data);
      });
    });
  }
  public OnjoinNamespace(): Observable<any> {
    return new Observable<any>((observable) => {
      this.socket.on("joinNamespace", (data) => {
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
  public SendGetNamespacelst() {
    this.socket.emit("getnamespacelst", "取得namespace列表");
  }
  public SendGetChannellst() {
    this.socket.emit("getchannellst", "取得頻道列表");
  }
  //#endregion
  //#region NameSpace相關
  //建立Namespace
  public createNamespace(nsname: string) {
    this.socket.emit("createNamespace", { name: nsname });
  }
  // 刪除Namespace
  deleteNameSpace(nsname: string) {
    this.socket.emit("deleteNamespace", { name: nsname });
  }
  // 加入Namespace
  joinNameSpace(nsname: string) {
    this.socket.emit("joinNamespace", { namespace: nsname });
  }
  //#endregion



}
