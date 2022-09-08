import { Injectable } from '@angular/core';
import {CanActivate, CanLoad} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.getUser()
      .pipe(map(user => {
        if (user) {
          return true;
        }

        this.authService.startAuthentication();
        return false;
      }));
  }

  canLoad(): Observable<boolean> {
    return this.canActivate();
  }
}
