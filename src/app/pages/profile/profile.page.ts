import { Component, OnInit } from '@angular/core';
import {User, UsersService} from "../../modules/gateway-api";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NewsCommentsComponent} from "../home/components/news-comments/news-comments.component";
import {ProfileFormComponent} from "./components/profile-form/profile-form.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  public user: User;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usersService.usersUserIdGet(params.id).subscribe(user => {
        this.user = user;
      });
    });
  }

  public setupInfo(): void {
    this.dialog.open(ProfileFormComponent, {
      data: this.user
    });
  }

}
