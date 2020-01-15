import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChatComponent } from '../chat/chat.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,

    children: [
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
      {

        path: 'chat', component: ChatComponent
      },
      //   {
      //     path: 'carlist',
      //     loadChildren: () => import('../car-list/car-list.module').then(m => m.CarListModule)
      //   },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
