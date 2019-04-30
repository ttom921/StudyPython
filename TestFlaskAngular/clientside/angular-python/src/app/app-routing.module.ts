import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
