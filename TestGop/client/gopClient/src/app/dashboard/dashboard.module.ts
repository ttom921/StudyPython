import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgMaterialComponent } from './ng-material/ng-material.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';

@NgModule({
  declarations: [NgMaterialComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
