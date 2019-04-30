import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) { }

  ngOnInit() {
    this.getUser();
  }
  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe((data) => {
      this.user = data;
      // console.log(this.user);
    });
  }
  goBack(): void {
    this.location.back();
  }
}
