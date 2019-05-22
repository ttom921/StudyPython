import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatRipple } from '@angular/material';

@Component({
  selector: 'app-ng-material',
  templateUrl: './ng-material.component.html',
  styleUrls: ['./ng-material.component.scss']
})
export class NgMaterialComponent implements OnInit {
  // 取得directive
  @ViewChild('ripple', { read: MatRipple }) ripple: MatRipple;
  constructor() { }

  ngOnInit() {
  }
  triggerRipple() {
    const point1 = this.ripple.launch(0, 0, { color: 'pink', centered: true, persistent: true, radius: 50 });
    const point2 = this.ripple.launch(0, 0, { color: 'yellow', centered: true, persistent: true, radius: 20 });
    setTimeout(() => {
      point1.fadeOut();
    }, 500);
  }
  clearRipple() {
    this.ripple.fadeOutAll();

  }
}
