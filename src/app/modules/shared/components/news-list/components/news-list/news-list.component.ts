import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Profile } from 'oidc-client';
import {NewsFeedPublication} from '../../../../../gateway-api';

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

  @Output()
  onDeleted = new EventEmitter<NewsFeedPublication>();

  constructor() { }

  public deleteEventHandler($event) {
    this.onDeleted.emit($event);
  }
}
