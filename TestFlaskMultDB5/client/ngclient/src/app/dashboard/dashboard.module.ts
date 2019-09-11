import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DataBasePageComponent } from './data-base-page/data-base-page.component';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { AddDatabaseDialogComponent } from '../dialog/add-database-dialog/add-database-dialog.component';


@NgModule({
  declarations: [DashboardComponent, DataBasePageComponent, UserPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  entryComponents: [AddDatabaseDialogComponent]
})
export class DashboardModule { }
