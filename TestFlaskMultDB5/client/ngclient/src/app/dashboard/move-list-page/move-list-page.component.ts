import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-move-list-page',
  templateUrl: './move-list-page.component.html',
  styleUrls: ['./move-list-page.component.scss']
})
export class MoveListPageComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  movesrc = "";
  @ViewChild('vmovie', { static: true }) vmovie: ElementRef;
  constructor() { }

  ngOnInit() {
    this.testmvdblist();
  }

  testmvdblist() {
    var movielist = [];
    let item = new Movie();
    let index = 0;
    let movename = "";
    item.name = `name_${index}`;
    movename = "file_example_MP4_1280_10MG.mp4";
    item.dataurl = `/assets/${movename}`;
    movielist.push(item);
    this.dataSource.data = movielist;
  }
  showmove(iteminfo) {
    console.log(this.vmovie);
    this.vmovie.nativeElement.src = iteminfo.dataurl

  }
}
