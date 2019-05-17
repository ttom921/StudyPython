import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatclient';
  myCheck: boolean = false;
  public CheckClick() {
    console.log("check click=" + this.myCheck);
  }
}
