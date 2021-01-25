import { Profile } from 'oidc-client';
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { NewsFeedPublication } from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  @Input()
  public publication: NewsFeedPublication;
  @Input()
  public currentUser: Profile;

  @Output() 
  onDeleted = new EventEmitter<NewsFeedPublication>();

  constructor() {}

  public menuItemHandler(itemMenu: string) : void {
    switch (itemMenu) {
      case 'delete':
        this.onDeleted.emit(this.publication)
        break;
    }
  }
}
