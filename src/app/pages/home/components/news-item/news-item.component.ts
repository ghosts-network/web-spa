import {Component, Input} from '@angular/core';
import {NewsFeedPublication} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass']
})
export class NewsItemComponent {

  @Input()
  public publication: NewsFeedPublication;

  constructor() { }

}
