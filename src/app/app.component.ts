import {Component, OnInit} from '@angular/core';
import {AuthService} from "./providers/services/auth/auth.service";
import {Profile} from "oidc-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public user: Profile;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser()
      .subscribe(user => {
        if (user) {
          this.user = user.profile;
        }
      });
  }

  logout() {
    this.authService.logout();
  }

}
