import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UserInfo} from '@gn/api';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {HttpClient} from '@angular/common/http';
declare let config: any;

@Injectable({
  providedIn: 'root'
})
export class RelationsResolver implements Resolve<RelationsSummary> {
  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RelationsSummary> {
    return this.httpClient.get<RelationsSummary>(`${config.basePath}/relations/${route.paramMap.get('id')}`);
  }
}

export interface RelationsSummary {
  friends: Array<UserInfo>;
  followers: Array<UserInfo>;
  incomingRequests: Array<UserInfo> | null;
  outgoingRequests: Array<UserInfo> | null;
  actions: RelationsActions;
}

export interface RelationsActions {
  addToFriends: boolean;
  removeFromFriends: boolean;
  reactIncomingRequest: boolean;
  cancelOutgoingRequest: boolean;
}
