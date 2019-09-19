import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { AddDatabaseDialogComponent } from './dialog/add-database-dialog/add-database-dialog.component';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';
import { DeleteDatabaseDialogComponent } from './dialog/delete-database-dialog/delete-database-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddDatabaseDialogComponent,
    DeleteDatabaseDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedAngularMaterialModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
