import { Component, OnInit } from '@angular/core';
import {User, UsersService} from "../../modules/gateway-api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  public user: User;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usersService.usersUserIdGet(params.id).subscribe(user => {
        this.user = user;
      });
    });
  }

}
