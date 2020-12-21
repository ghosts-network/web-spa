import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../providers/services/auth/auth.service";

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.completeAuthentication(window.location.href)
      .then(() => {
        window.location.href = '/';
      });
  }

}
