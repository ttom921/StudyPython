import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Event } from "../model/event";
import { ImagefileService } from 'src/app/services/imagefile.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-room1',
  templateUrl: './room1.component.html',
  styleUrls: ['./room1.component.scss']
})
export class Room1Component implements OnInit {

  //SERVER_URL = "http://localhost:3000";
  //SERVER_URL = "http://172.18.2.7:3000";
  constructor(private socketService: SocketService, private imagefileService: ImagefileService) { }
  textValue = "";
  messages: string[] = [];

  // nampscace相關
  textNamespace = "";
  namespacelst: string[] = [];
  seltextNamespace = "";
  curnamespace = "";
  //
  @ViewChild("photoImage") photoImage: ElementRef;

  //
  @Input('isVisiableImg') isVisiableImg: boolean;

  ngOnInit() {
    this.initIoConnection(environment.SERVER_URL);
  }
  private initIoConnection(nsspace: string) {
    this.socketService.InitSocket(nsspace);
    console.log("initIoConnection->" + nsspace);
    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      let fmtmsg = `[client ns:${this.curnamespace} ]connedted`;
      this.curnamespace = this.socketService.getNameSpace();
      console.log(fmtmsg);
      this.socketService.SendConnect();

    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("[client] disconnedted");

    });
    this.socketService.Onchatmessage().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace} ]<chatmessage> Message=${data}`;
      this.messages.push(fmtmsg);
    });

    this.socketService.OnUpdateNamespaceList().subscribe((data) => {
      let fmtmsg = `[client ns:${this.curnamespace}]<UpdateNamespaceList> namespacelst=${data.result}`;
      console.log(fmtmsg);
      this.namespacelst = data.result;
    });

    // 加入新的namespace
    this.socketService.OnJoinToApp().subscribe((data) => {
      let connecturl = environment.SERVER_URL + "/" + data.namespace;
      let fmtmsg = `[client ns:${this.curnamespace}]<JoinToApp> namespace=${connecturl}`;
      this.messages.push(fmtmsg);
      console.log(fmtmsg);
      this.socketService.disconnect();
      this.initIoConnection(connecturl);

    });
    // 收到bytemessage
    this.socketService.Onbytemessage().subscribe((data) => {
      //let fmtmsg = `[client ns:${this.curnamespace}]<bytemessage> data.bufdata=${data.bufdata}`;
      let fmtmsg = `[client ns:${this.curnamespace}]<bytemessage> `;
      //console.log(fmtmsg);
      if (this.isVisiableImg == false) {
        let blob = new Blob([data], { type: "image/jpeg" });
        let urlCreator = window.URL;
        this.photoImage.nativeElement.src = urlCreator.createObjectURL(blob)
      }


      data = null;

    });
  }
  public Sendchatmessage() {
    // let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`
    let fmtmsg = `[client ns:${this.curnamespace}]<chatmessage>=${this.textValue}`;
    console.log(fmtmsg);
    this.socketService.Sendchatmessage(this.textValue);
    this.textValue = "";
  }

  public createNamespace() {
    let fmtmsg = `[client ns:${this.curnamespace}]<createNamespace>=${this.textNamespace}`;
    console.log(fmtmsg);
    this.socketService.createNamespace(this.textNamespace);
  }
  // 加入選擇的namespace
  public joinToNamespace(): void {
    let fmtmsg = `[client ns:${this.curnamespace}]<JoinToApp>=${this.seltextNamespace}`
    console.log(fmtmsg);
    this.socketService.joinToNamespace(this.seltextNamespace);
  }
  // 發送圖片
  public Upload(file: HTMLInputElement) {
    //let fmtmsg = `[client ns:${this.curnamespace}]<JoinToApp>=${this.seltextNamespace}`

    let fmtmsg = "send pic";
    //console.log(fmtmsg);
    if (file.value.length === 0) return;
    //讀所有的圖檔
    const uploadPromises = [];

    const files: FileList = file.files;
    let Bufferary = new ArrayBuffer(files.length);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      //fmtmsg = element.name;
      //console.log(fmtmsg);
      let uploadPromise = this.imagefileService.GetBufferFromFile(element);
      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises).then(result => {
      for (let i = 0; i < files.length; i++) {
        Bufferary[i] = result[i];
        console.log(Bufferary[i]);
      }
      //this.socketService.Sendbytemessage({ "room": 'room1', "bufdata": Bufferary[0] });
      //開始發射
      let maximgnum = files.length;
      let count = 0;
      setInterval(() => {

        this.socketService.Sendbytemessage(Bufferary[count]);
        count = (count + 1) % maximgnum;
        //console.log(count);
        // for (let i = 0; i < files.length; i++) {
        //   // var file = files[i]
        //   //console.log('發射:'+file.name )
        //   //socket.emit('byte message', { image: true, buffer: Bufferary[i] });
        //   this.socketService.Sendbytemessage({ "room": 'room1', "bufdata": Bufferary[i] });
        // }
      }, 66);
    });




  }
  public CheckImg() {
    console.log("isVisiableImg=" + this.isVisiableImg);
  }

}
