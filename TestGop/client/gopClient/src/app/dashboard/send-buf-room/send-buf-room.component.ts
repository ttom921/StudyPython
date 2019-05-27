import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PySocketioService } from 'src/app/service/py-socketio.service';
import { ImageFileService } from 'src/app/service/image-file.service';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-send-buf-room',
  templateUrl: './send-buf-room.component.html',
  styleUrls: ['./send-buf-room.component.scss'],
  providers: [PySocketioService]
})
export class SendBufRoomComponent implements OnInit, AfterViewInit {

  clientclassname = this.constructor.name;
  @Input() socketiourl: string;
  @ViewChild("photoImage") photoImage: ElementRef;
  channels: string[] = [];
  selected = "channel1";
  curnamespace = "";
  myCheck: boolean = false;
  constructor(private snackBar: MatSnackBar, private socketService: PySocketioService, private imageFileService: ImageFileService) { }

  ngOnInit() {
    // 切換到指定的namespace
    let myurl = this.socketiourl === "/" ? "" : "/" + this.socketiourl;
    let connecturl = environment.SERVER_URL;// + "/" + this.socketiourl;
    this.socketService.initIoConnection(connecturl);

    this.curnamespace = this.socketService.getNameSpace();
    //要求頻道列表
    this.socketService.SendGetChannellst();

  }
  ngAfterViewInit(): void {
    //收到channel列表
    this.socketService.onupdateChannelList().subscribe(data => {
      let fmtmsg = `${this.clientclassname}->[client ns:${this.curnamespace}]<updateChannelList> ChannelList=${data.result}`;
      console.log(fmtmsg);
      this.channels = data.result;
    });
    this.socketService.Onjoin().subscribe(data => {
      let fmtmsg = `${this.clientclassname}->[client ns:${this.curnamespace}]<join> data=${data.channel}`;
      console.log(fmtmsg);
      fmtmsg = `已加人 ${data.channel} 的頻道`;
      this.snackBar.open(fmtmsg, '我知道了',
        {
          duration: 2000
        });
    });

    this.socketService.Onbytemessage().subscribe(data => {
      let fmtmsg = `${this.clientclassname}->[client ns:${this.curnamespace}]<bytemessage> data=${data.channel}`;
      //console.log(fmtmsg);
      if (this.myCheck === false) {
        let buffdata = data.bufdata;
        let blob = new Blob([buffdata], { type: "image/jpeg" });
        let urlCreator = window.URL;
        this.photoImage.nativeElement.src = urlCreator.createObjectURL(blob);
      }
      data.bufdata = null;
    });
  }

  SendJoinChannel() {
    let strchannel = this.selected;
    this.socketService.Sendjoin({ channel: strchannel });
  }

  // 發送圖片
  public Upload(file: HTMLInputElement) {
    if (file.value.length === 0) return;
    //讀所有的圖檔
    const uploadPromises = [];
    const files: FileList = file.files;
    let Bufferary = new ArrayBuffer(files.length);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      //fmtmsg = element.name;
      //console.log(fmtmsg);
      let uploadPromise = this.imageFileService.GetBufferFromFile(element);
      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises).then(result => {
      for (let i = 0; i < files.length; i++) {
        Bufferary[i] = result[i];
        console.log(Bufferary[i]);
      }

      //this.socketService.Sendbytemessage({ "channel": this.selected, "bufdata": Bufferary[0] });
      //開始發射
      let maximgnum = files.length;
      let count = 0;
      setInterval(() => {
        this.socketService.Sendbytemessage({ "channel": this.selected, "bufdata": Bufferary[count] });
        count = (count + 1) % maximgnum;
        console.log(count);
      }, 66);

    });

  }
  public CheckClick() {
    console.log("check click=" + this.myCheck);
  }

}
