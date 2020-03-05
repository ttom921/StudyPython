import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DVRService } from 'src/app/_services/dvr/dvr.service';
import { CarInfo, Company } from 'src/app/_models/car-info';
import { Car } from 'src/app/_models/cars';
@Component({
  selector: 'app-dvrpost',
  templateUrl: './dvrpost.component.html',
  styleUrls: ['./dvrpost.component.scss']
})
export class DVRPostComponent implements OnInit {
  @ViewChild('btn', { static: true }) btn: ElementRef;
  btnisDisable = false;
  dvrInfos: CarInfo[] = [];
  constructor(
    private dvrService: DVRService
  ) { }

  ngOnInit() {
    this.testGenDVRInfos();
    //console.log(this.dvrInfos);
  }
  onClick(e) {
    this.btnisDisable = true;
    // e.target.disable = true;
    // console.log(e);
    setInterval(() => {
      this.testRanderProgress();
    }, 10000);
    //this.testRanderProgress();
  }
  //#region 以下是測試程式
  testRanderProgress() {
    this.dvrInfos.forEach(item => {
      item.car.fw_update_progress = Math.random() * 100 | 0;
    });
    //let jsonstr = JSON.stringify(this.dvrInfos);
    //console.log(jsonstr);
    let dataInfo = {
      channel: "HiSharp",
      message: this.dvrInfos
    }

    this.dvrService.Post(dataInfo).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error);
      }
    );
  }
  testGenDVRInfos() {
    for (let i = 0; i < 10; i++) {
      let mycar: Car = {
        car_uid: `車牌-${i}`,
        id: i,
        fw_update_progress: Math.random() * 100 | 0,
      }
      let mycompany: Company = {
        name: "HiSharp",
        id: 888,
        //address: "住址",
        //tel: "電話"
      }
      let dvrinfo: CarInfo = {
        id: i,
        dvr_uid: this.dvrService.base64(String(i)),
        dvr_model: "MR800",
        version: "v01.00.00",
        car: mycar,
        company: mycompany
      }
      this.dvrInfos.push(dvrinfo);
    }
  }
  //#endregion
}
