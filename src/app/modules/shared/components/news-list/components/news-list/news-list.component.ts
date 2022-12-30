import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NewsFeedPublication} from '@gn/api';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent {

  @Input()
  public news: NewsFeedPublication[];
  @Input()
  public currentUserId: string;

  @Output()
  OnDeleted = new EventEmitter<NewsFeedPublication>();
  @Output()
  OnEdited = new EventEmitter<NewsFeedPublication>();

  constructor() { }

  public deleteEventHandler($event: NewsFeedPublication): void {
    this.OnDeleted.emit($event);
  }

  public editEventHandler($event: NewsFeedPublication): void {
    this.OnEdited.emit($event);
  }
}
