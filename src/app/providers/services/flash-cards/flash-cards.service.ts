import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
declare let config: any;

@Injectable({
  providedIn: 'root'
})
export class FlashCardsService {
  constructor(private httpClient: HttpClient) { }

  public saveProgress(id, model): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.httpClient.put(`${config.basePath}/education/materials/flash-cards/sets/${id}/progress`, model, options);
  }
}
