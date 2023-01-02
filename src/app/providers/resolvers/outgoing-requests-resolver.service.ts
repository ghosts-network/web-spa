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
export class OutgoingRequestsResolver implements Resolve<OutgoingRequestsList> {
  constructor(private authService: AuthService,
              private relationsService: RelationsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OutgoingRequestsList> {
    return this.relationsService.relationsFriendsOutgoingRequestsGet(0, AppConstants.RelationsPerPage)
      .pipe(map(body => {
        return {
          hasMore: body.length === AppConstants.RelationsPerPage,
          outgoingRequests: body
        };
      }));
  }
}

export interface OutgoingRequestsList {
  hasMore: boolean;
  outgoingRequests: Array<UserInfo>;
}
