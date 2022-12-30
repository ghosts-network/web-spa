import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {NewsFeedPublication, NewsFeedService} from '@gn/api';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppConstants} from '@gn/constants';

@Injectable({
  providedIn: 'root'
})
export class PublicationsResolver implements Resolve<PublicationsList> {
  constructor(private newsFeedService: NewsFeedService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PublicationsList> {
    return this.newsFeedService
      .newsFeedUsersUserIdGet(route.paramMap.get('id'), null, AppConstants.NewsPerPage, null, 'response')
      .pipe(map(response => {
          return {
            cursor: response.headers.get(AppConstants.Headers.Cursor),
            hasMore: response.body.length === AppConstants.NewsPerPage,
            publications: response.body
          };
        }));
  }
}

export interface PublicationsList {
  cursor: string;
  hasMore: boolean;
  publications: Array<NewsFeedPublication>;
}
