import { Component, OnInit } from '@angular/core';
import { FirmWareService } from 'src/app/_services/fw/firm-ware.service';

@Component({
  selector: 'app-fw-file-list',
  templateUrl: './fw-file-list.component.html',
  styleUrls: ['./fw-file-list.component.scss']
})
export class FwFileListComponent implements OnInit {

  fileslist: [] = [];
  constructor(private firmWareService: FirmWareService) { }

  ngOnInit() {
    this.firmWareService.Gets().subscribe((data) => {
      this.fileslist = data.fileslist;
      console.log(this.fileslist);
    });
  }

}
