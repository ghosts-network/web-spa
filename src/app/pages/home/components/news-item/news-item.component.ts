import { Profile } from 'oidc-client';
import {Component, Input} from '@angular/core';
import { NewsFeedPublication, NewsFeedService, PublicationComment} from '../../../../modules/gateway-api';

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
}
