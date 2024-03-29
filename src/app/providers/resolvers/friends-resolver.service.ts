import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RelationsService, UserInfo} from '@gn/api';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {map} from 'rxjs/operators';
import {AppConstants} from '@gn/constants';

@Injectable({
  providedIn: 'root'
})
export class FriendsResolver implements Resolve<FriendsList> {
  constructor(private authService: AuthService,
              private relationsService: RelationsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FriendsList> {
    const profileId = route.paramMap.get('id');
    return this.relationsService.relationsUserIdFriendsGet(profileId, 0, AppConstants.RelationsPerPage)
      .pipe(map(body => {
        return {
          hasMore: body.length === AppConstants.RelationsPerPage,
          friends: body
        };
      }));
  }
}

export interface FriendsList {
  hasMore: boolean;
  friends: Array<UserInfo>;
}
