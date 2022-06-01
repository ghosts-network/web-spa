import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  public currentUserId: string;

  @Output()
  OnDeleted = new EventEmitter<NewsFeedPublication>();
  @Output()
  OnEdited = new EventEmitter<NewsFeedPublication>();

  constructor() { }

  public deleteEnabled(publication: NewsFeedPublication): boolean {
    return this.currentUserId === publication.author.id;
  }

  public editEnabled(publication: NewsFeedPublication): boolean {
    return this.currentUserId === publication.author.id;
  }

  public deleteEventHandler($event): void {
    this.OnDeleted.emit($event);
  }

  public editEventHandler($event): void {
    this.OnEdited.emit($event);
  }
}
