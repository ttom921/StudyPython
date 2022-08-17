import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Room1Component } from './chat/room1/room1.component';
import { WsroomComponent } from './chat/wsroom/wsroom.component';

@NgModule({
  declarations: [
    AppComponent,
    Room1Component,
    WsroomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
