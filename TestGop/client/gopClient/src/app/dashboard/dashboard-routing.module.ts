import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgMaterialComponent } from './ng-material/ng-material.component';
import { PyManagerComponent } from './py-manager/py-manager.component';
import { ChatLoddyComponent } from './chat-loddy/chat-loddy.component';
import { PySenderLobbyComponent } from './py-sender-lobby/py-sender-lobby.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'ngmaterial', pathMatch: 'full' },
      { path: 'ngmaterial', component: NgMaterialComponent },
      { path: 'manager', component: PyManagerComponent },
      { path: 'pysendlobby', component: PySenderLobbyComponent },
      { path: 'chatloddy', component: ChatLoddyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
