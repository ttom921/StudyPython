import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Room1Component } from './chat/room1/room1.component';
import { ChannelComponent } from './chat/channel/channel.component';
import { SendchannelComponent } from './chat/sendchannel/sendchannel.component';
import { RoomComponent } from './chat/room/room.component';
import { CharRoomComponent } from './chat/char-room/char-room.component';
import { Channel1Component } from './chat/channel1/channel1.component';

@NgModule({
  declarations: [
    AppComponent,
    Room1Component,
    ChannelComponent,
    SendchannelComponent,
    RoomComponent,
    CharRoomComponent,
    Channel1Component
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
