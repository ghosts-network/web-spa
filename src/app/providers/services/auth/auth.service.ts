import { Injectable } from '@angular/core';
import {UserManagerSettings, UserManager, User, Profile} from 'oidc-client';
import {from, Observable} from 'rxjs';
declare let config: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.manager = new UserManager(AuthService.getClientSettings());
  }

  private manager: UserManager;

  private static getClientSettings(): UserManagerSettings {
    return config.auth;
  }

  getUser(): Observable<User | null> {
    return from(this.manager.getUser());
  }

  getProfile(): Observable<Profile | null> {
    const prom = this.manager.getUser()
      .then(user => {
        if (user) {
          return user.profile;
        }

        return null;
      });

    return from(prom);
  }

  logout(): Observable<void> {
    return from(this.manager.signoutRedirect());
  }

  startAuthentication(): Observable<void> {
    return from(this.manager.signinRedirect());
  }

  completeAuthentication(url): Observable<User> {
    return from(this.manager.signinRedirectCallback(url));
  }
}
