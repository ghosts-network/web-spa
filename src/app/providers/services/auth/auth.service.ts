import { Injectable } from '@angular/core';
import {UserManagerSettings, UserManager, User, Profile} from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager: UserManager;

  constructor() {
    this.manager = new UserManager(AuthService.getClientSettings());
  }

  getUser(): Promise<User | null> {
    return this.manager.getUser();
  }

  getProfile(): Promise<Profile | null> {
    return this.manager.getUser()
      .then(user => {
        if (user) {
          return user.profile;
        }

        return null;
      });
  }

  logout(): Promise<void> {
    return this.manager.signoutRedirect();
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(url): Promise<User> {
    return this.manager.signinRedirectCallback(url);
  }

  private static getClientSettings(): UserManagerSettings {
    return {
      authority: 'http://localhost:6030/',
      client_id: 'angular_spa',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: "id_token token",
      scope: "openid profile",
      filterProtocolClaims: true,
      loadUserInfo: true
    };
  }
}
