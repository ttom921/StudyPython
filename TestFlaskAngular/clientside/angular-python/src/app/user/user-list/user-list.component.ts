import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Subscriber } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private uservice:UserService,private location: Location) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers():void{
    //console.log('getUsers------------------');
    this.uservice.getUsers().subscribe((users)=>{
        this.users=users;
        //console.log(users);
    });
    
  }
  delete(user:User):void{
    if(confirm("Are you sure to delete?"))
    {
      this.uservice.deleteUser(user).subscribe(()=>{
        window.location.reload();
      });
    }
  }

}
