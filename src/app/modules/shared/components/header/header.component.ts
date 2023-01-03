import {Component, OnInit} from '@angular/core';
import {Profile} from 'oidc-client';
import {AuthService} from '../../../../providers/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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

  logout(): void {
    this.authService.logout();
  }

}
