import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NewsFeedPublication} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {

  @Input()
  public publication: NewsFeedPublication;
  @Input()
  public onPublished: any;

  constructor() { }

}
