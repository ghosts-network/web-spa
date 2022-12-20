import { Injectable } from '@angular/core';
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
export class FlashCardsSetResolver implements Resolve<FlashCardsSet> {
  constructor(protected httpClient: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlashCardsSet> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.httpClient.get<FlashCardsSet>(`${config.basePath}/education/materials/flash-cards/sets/${route.params.id}`, options);
  }
}
