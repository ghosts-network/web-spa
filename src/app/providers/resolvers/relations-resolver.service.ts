import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RelationsService, UserInfo} from '@gn/api';
import {forkJoin, Observable, of} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelationsResolver implements Resolve<Relations> {
  constructor(private authService: AuthService,
              private relationsService: RelationsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Relations> {
    const profileId = route.paramMap.get('id');
    return this.authService.getUser().pipe(
      switchMap(user => {
        const subs = [
          this.relationsService.relationsUserIdFriendsGet(profileId, 0, 20),
          this.relationsService.relationsUserIdFollowersGet(profileId, 0, 20),
          user.profile.sub === profileId
            ? this.relationsService.relationsFriendsIncomingRequestsGet(0, 20)
            : of(null),
          user.profile.sub === profileId
            ? this.relationsService.relationsFriendsOutgoingRequestsGet(0, 20)
            : of(null)
        ];

        return forkJoin(subs)
          .pipe(map(([friends, followers, incoming, outgoing]) => {
            return {
              friends: friends as UserInfo[],
              followers: followers as UserInfo[],
              incomingRequests: incoming,
              outgoingRequests: outgoing,
              isInFriends: false,
              isInOutgoingRequests: false
            };
          }));
      })
    );
  }
}

export interface Relations {
  friends: Array<UserInfo>;
  followers: Array<UserInfo>;
  incomingRequests: Array<UserInfo> | null;
  outgoingRequests: Array<UserInfo> | null;
  isInFriends: boolean;
  isInOutgoingRequests: boolean;
}
