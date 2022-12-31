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
export class FollowersResolver implements Resolve<FollowersList> {
  constructor(private authService: AuthService,
              private relationsService: RelationsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FollowersList> {
    const profileId = route.paramMap.get('id');
    return this.relationsService.relationsUserIdFollowersGet(profileId, 0, AppConstants.RelationsPerPage)
      .pipe(map(body => {
        return {
          hasMore: body.length === AppConstants.RelationsPerPage,
          followers: body
        };
      }));
  }
}

export interface FollowersList {
  hasMore: boolean;
  followers: Array<UserInfo>;
}
