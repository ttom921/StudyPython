import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DataBasePageComponent } from './data-base-page/data-base-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MoveListPageComponent } from './move-list-page/move-list-page.component';


const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'userpage', pathMatch: 'full' },
      { path: 'userpage', component: UserPageComponent },
      { path: 'dbpage', component: DataBasePageComponent },
      { path: 'movelistpage', component: MoveListPageComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
