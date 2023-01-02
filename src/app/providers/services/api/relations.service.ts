import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RelationsSummary} from './relations-summary';
declare let config: any;

@Injectable({
  providedIn: 'root'
})
export class RelationsService {
  constructor(private httpClient: HttpClient) { }

  public getSummary(userId: string): Observable<RelationsSummary> {
    return this.httpClient.get<RelationsSummary>(`${config.basePath}/relations/${userId}`);
  }

  public removeFriendRequest(toUser: string): Observable<any> {
    return this.httpClient.delete<any>(`${config.basePath}/relations/friends/${encodeURIComponent(toUser)}`, null);
  }

  public sendFriendRequest(toUser: string): Observable<any> {
    return this.httpClient.post<any>(`${config.basePath}/relations/friends/${encodeURIComponent(toUser)}`, null);
  }

  public cancelOutgoingRequest(toUser: string): Observable<any> {
    return this.httpClient.delete<any>(`${config.basePath}/relations/outgoing/${encodeURIComponent(toUser)}`);
  }

}

