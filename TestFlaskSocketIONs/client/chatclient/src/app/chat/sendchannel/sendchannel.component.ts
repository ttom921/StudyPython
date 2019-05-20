import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sendchannel',
  templateUrl: './sendchannel.component.html',
  styleUrls: ['./sendchannel.component.scss']
})
export class SendchannelComponent implements OnInit {

  myCheck: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  public CheckClick() {
    console.log("check click=" + this.myCheck);
  }
}
