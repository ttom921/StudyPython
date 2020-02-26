import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadComponent } from './pages/upload/upload.component';
import { SharedAngularMaterialModule } from './share/shared-angular-material/shared-angular-material.module';
import { FwFileListComponent } from './pages/fw-file-list/fw-file-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    FwFileListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedAngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
