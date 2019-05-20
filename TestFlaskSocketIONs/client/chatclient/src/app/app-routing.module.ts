import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendchannelComponent } from './chat/sendchannel/sendchannel.component';
import { RoomComponent } from './chat/room/room.component';

const routes: Routes = [
  { path: '', redirectTo: 'room', pathMatch: 'full' },
  { path: 'sendchannel', component: SendchannelComponent },
  { path: 'room', component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
