import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { FwFileListComponent } from './pages/fw-file-list/fw-file-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'fwupload', pathMatch: 'full' },
  { path: 'fwupload', component: UploadComponent },
  { path: 'fwfilelist', component: FwFileListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
