import { Injectable } from '@angular/core';
import {CanActivate, CanLoad} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService) { }

  canActivate(): Promise<boolean> {
    return this.authService.getUser()
      .then(user => {
        if (user) {
          return true;
        }

        this.authService.startAuthentication();
        return false;
      });
  }

  canLoad(): Promise<boolean> {
    return this.canActivate();
  }
}
