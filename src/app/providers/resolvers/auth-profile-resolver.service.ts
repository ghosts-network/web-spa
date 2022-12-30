import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {map} from 'rxjs/operators';
import {Profile} from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthProfileResolver implements Resolve<Profile> {
  constructor(private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile> {
    return this.authService.getUser()
      .pipe(map((user => user.profile)));
  }
}
