import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Profile } from 'oidc-client';
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
