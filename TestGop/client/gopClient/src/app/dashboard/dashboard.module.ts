import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgMaterialComponent } from './ng-material/ng-material.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { PyManagerComponent } from './py-manager/py-manager.component';
import { PySenderComponent } from './py-sender/py-sender.component';
import { PyReciverComponent } from './py-reciver/py-reciver.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgMaterialComponent, PyManagerComponent, PySenderComponent, PyReciverComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
