import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {FlashCardsSet} from './flash-cards-set';
import {HttpClient, HttpHeaders} from '@angular/common/http';
declare let config: any;

@Injectable({
  providedIn: 'root'
})
export class FlashCardsSetsResolver implements Resolve<Array<FlashCardsSet>> {
  constructor(protected httpClient: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<FlashCardsSet>> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.httpClient.get<Array<FlashCardsSet>>(`${config.basePath}/education/materials/flash-cards/sets`, options);
  }
}
