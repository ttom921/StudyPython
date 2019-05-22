import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgMaterialComponent } from './ng-material/ng-material.component';
import { PyManagerComponent } from './py-manager/py-manager.component';
import { PySenderComponent } from './py-sender/py-sender.component';
import { PyReciverComponent } from './py-reciver/py-reciver.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'ngmaterial', pathMatch: 'full' },
      { path: 'ngmaterial', component: NgMaterialComponent },
      { path: 'manager', component: PyManagerComponent },
      { path: 'sender', component: PySenderComponent },
      { path: 'reciver', component: PyReciverComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
