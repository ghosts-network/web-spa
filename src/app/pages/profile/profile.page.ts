import { Component, OnInit } from '@angular/core';
import {User, UsersService} from "../../modules/gateway-api";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
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
      this.fetchUser(params.id);
    });
  }

  private fetchUser(id: string) {
    this.usersService.usersUserIdGet(id).subscribe(user => {
      this.user = user;
    });
  }

  public setupInfo(): void {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.usersService.usersUserIdPut(this.user.id, {
          gender: result.gender
        }).subscribe(r => {
          this.fetchUser(this.user.id);
        });
      }
    });
  }



}
