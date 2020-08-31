import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class PublicationService {
  constructor(private http: HttpClient) { }

  public search(): Observable<{ content: string }[]> {
    return this.http.get<{ content: string }[]>('http://localhost:5300/publications');
  }

  public insert(publication: { content: string }): Observable<any> {
    return this.http.post('http://localhost:5300/publications', publication);
  }

}
