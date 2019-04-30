import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  public user: User= new User();
  
  constructor(private usersevice:UserService,private location:Location) { }

  ngOnInit() {
  }
  // 加人使用者
  save():void{
    this.usersevice.addUser(this.user).subscribe((res)=>{
      console.log(res);
      this.goBack()});
  }
  // 回上一頁
  goBack():void{
    this.location.back();
  }
}
