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
    return this.relationsService.relationsUserIdFriendsGet(profileId, 0, 20, 'response')
      .pipe(map(response => {
        return {
          cursor: response.headers.get(AppConstants.Headers.Cursor),
          hasMore: response.body.length === AppConstants.NewsPerPage,
          friends: response.body
        };
      }));
  }
}

export interface FriendsList {
  cursor: string | null;
  hasMore: boolean;
  friends: Array<UserInfo>;
}
