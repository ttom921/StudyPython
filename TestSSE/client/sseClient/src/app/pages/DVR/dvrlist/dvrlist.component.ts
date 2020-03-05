import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DVRService } from 'src/app/_services/dvr/dvr.service';
import { CarInfo } from 'src/app/_models/car-info';

@Component({
  selector: 'app-dvrlist',
  templateUrl: './dvrlist.component.html',
  styleUrls: ['./dvrlist.component.scss']
})
export class DVRListComponent implements OnInit {

  dvrinfos: CarInfo[] = [];
  dataSource = [];
  constructor(
    private dvrService: DVRService
  ) {
    const source = this.dvrService.getEventSource("HiSharp");
    source.addEventListener('dvr', (event: MessageEvent) => {
      let jsonobj = JSON.parse(event.data)
      //console.log(jsonobj);
      this.dvrinfos = jsonobj.message as CarInfo[];
      //可以解碼base64
      // dvrinfos.map(item => {
      //   item.dvr_uid = this.dvrService.decodebase64(item.dvr_uid)
      // });
      this.dataSource = this.dvrinfos;
    });
    source.addEventListener('error', (event: MessageEvent) => {
      console.log('reconnected service!')
    }, false);
  }

  ngOnInit() {
  }

}
