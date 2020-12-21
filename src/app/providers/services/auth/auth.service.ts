import { Injectable } from '@angular/core';
import { UserManagerSettings, UserManager, User, Profile } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager: UserManager;

  constructor() {
    this.manager = new UserManager(AuthService.getClientSettings());
  }

  isLoggedIn(): Promise<boolean> {
    return this.getUser()
      .then(user => {
        return user != null && !user.expired
      });
  }

  getUser(): Promise<User> {
    return this.manager.getUser();
  }

  getClaims(): Promise<Profile> {
    return this.getUser()
      .then(u => {
        if (!u) {
          return null;
        }

        return u.profile;
      });
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(url): Promise<User> {
    return this.manager.signinRedirectCallback(url);
  }

  private static getClientSettings(): UserManagerSettings {
    return {
      authority: 'https://localhost:5001/',
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
