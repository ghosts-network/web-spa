import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {NewsFeedPublication, NewsFeedService} from '@gn/api';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import {AppConstants} from '@gn/constants';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedResolver implements Resolve<NewsFeedList> {
  constructor(private authService: AuthService,
              private newsFeedService: NewsFeedService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NewsFeedList> {
    return this.authService.getUser().pipe(
      switchMap(user => {
        return this.newsFeedService
          .newsFeedGet(null, AppConstants.NewsPerPage, null, 'response')
          .pipe(map(response => {
            return {
              cursor: response.headers.get(AppConstants.Headers.Cursor),
              hasMore: response.body.length === AppConstants.NewsPerPage,
              publications: response.body
            };
          }));
      }));
  }
}

export interface NewsFeedList {
  cursor: string;
  hasMore: boolean;
  publications: Array<NewsFeedPublication>;
}
