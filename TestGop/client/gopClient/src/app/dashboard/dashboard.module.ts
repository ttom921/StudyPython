import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgMaterialComponent } from './ng-material/ng-material.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { PyManagerComponent } from './py-manager/py-manager.component';
import { FormsModule } from '@angular/forms';
import { ChatLoddyComponent } from './chat-loddy/chat-loddy.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { PySenderLobbyComponent } from './py-sender-lobby/py-sender-lobby.component';
import { SendBufRoomComponent } from './send-buf-room/send-buf-room.component';

@NgModule({
  declarations: [NgMaterialComponent, PyManagerComponent, ChatLoddyComponent, ChatRoomComponent, PySenderLobbyComponent, SendBufRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
