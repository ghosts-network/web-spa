import { Profile } from 'oidc-client';
import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { NewsFeedPublication } from '../../../../../gateway-api';

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

  public get isCurrentUserPost(): boolean {
    return this.currentUser.sub == this.publication.author.id;
  }

  public deleteClick(): void {
    this.onDeleted.emit(this.publication);
  }
}
