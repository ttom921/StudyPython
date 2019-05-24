import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgMaterialComponent } from './ng-material/ng-material.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { PyManagerComponent } from './py-manager/py-manager.component';
import { PySenderComponent } from './py-sender/py-sender.component';
import { FormsModule } from '@angular/forms';
import { ChatLoddyComponent } from './chat-loddy/chat-loddy.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

@NgModule({
  declarations: [NgMaterialComponent, PyManagerComponent, PySenderComponent, ChatLoddyComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
