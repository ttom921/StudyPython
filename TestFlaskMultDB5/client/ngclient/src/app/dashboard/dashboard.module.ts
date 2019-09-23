import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedAngularMaterialModule } from '../share/shared-angular-material/shared-angular-material.module';
import { DataBasePageComponent } from './data-base-page/data-base-page.component';
import { FormsModule } from '@angular/forms';
import { UserPageComponent } from './user-page/user-page.component';
import { AddDatabaseDialogComponent } from '../dialog/add-database-dialog/add-database-dialog.component';
import { DeleteDatabaseDialogComponent } from '../dialog/delete-database-dialog/delete-database-dialog.component';
import { AddUserDialogComponent } from '../dialog/add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from '../dialog/delete-user-dialog/delete-user-dialog.component';
import { ModifyUserDialogComponent } from '../dialog/modify-user-dialog/modify-user-dialog.component';
import { MoveListPageComponent } from './move-list-page/move-list-page.component';
import { MovePlayerPageComponent } from './move-player-page/move-player-page.component';


@NgModule({
  declarations: [DashboardComponent, DataBasePageComponent, UserPageComponent, MoveListPageComponent, MovePlayerPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedAngularMaterialModule,
    DashboardRoutingModule
  ],
  entryComponents: [AddDatabaseDialogComponent, DeleteDatabaseDialogComponent, AddUserDialogComponent, DeleteUserDialogComponent, ModifyUserDialogComponent]
})
export class DashboardModule { }
