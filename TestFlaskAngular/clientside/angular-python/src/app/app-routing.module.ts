import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserListComponent },
  { path: 'add', component: UserAddComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'edit/:id', component: UserEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
