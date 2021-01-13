import { Profile } from 'oidc-client';
import {Component, Input} from '@angular/core';
import { NewsFeedPublication, NewsFeedService, PublicationComment} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {

  @Input()
  public publication: NewsFeedPublication;
  @Input()
  public currentUser: Profile;
}
