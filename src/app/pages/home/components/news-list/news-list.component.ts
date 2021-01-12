import { Profile } from 'oidc-client';
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NewsFeedPublication} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {

  @Input()
  public news: NewsFeedPublication[];
  @Input()
  public user: Profile;

  constructor() { }

}
