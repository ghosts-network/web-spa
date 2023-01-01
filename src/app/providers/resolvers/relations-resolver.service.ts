import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {RelationsService, RelationsSummary} from '../services/api';

@Injectable({
  providedIn: 'root'
})
export class RelationsResolver implements Resolve<RelationsSummary> {
  constructor(private authService: AuthService,
              private relationsService: RelationsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RelationsSummary> {
    return this.relationsService.getSummary(route.paramMap.get('id'));
  }
}
