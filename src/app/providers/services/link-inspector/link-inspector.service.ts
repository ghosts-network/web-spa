import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LinkMeta} from '../../../modules/shared/components/link-meta/link-meta';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
declare let config: any;

@Injectable({
  providedIn: 'root'
})
export class LinkInspectorService {
  constructor(private httpClient: HttpClient) { }

  public getMeta(urls: string[]): Observable<Map<string, LinkMeta>> {
    const body = {urls};

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.httpClient.post<Map<string, LinkInspectorMeta>>(config.linkInspector.basePath, body, options)
      .pipe(map(response => {
        const resultMap = new Map<string, LinkMeta>();
        for (const url in response) {
          resultMap[url] = {
            title: response[url].title,
            description: response[url].description,
            image: response[url].og.image,
          };
        }

        return resultMap;
      }));
  }
}

interface LinkInspectorMeta {
  readonly title: string;
  readonly description: string;
  readonly og: LinkInspectorOGMeta;
}

interface LinkInspectorOGMeta {
  readonly image: string;
}
