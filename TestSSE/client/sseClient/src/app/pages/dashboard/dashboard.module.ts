import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ChatComponent } from '../chat/chat.component';
import { SharedAngularMaterialModule } from 'src/app/share/shared-angular-material/shared-angular-material.module';


@NgModule({
  declarations: [DashboardComponent, ChatComponent],
  imports: [
    CommonModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  exports: [

  ]
})
export class DashboardModule { }
