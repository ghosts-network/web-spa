import { Component, EventEmitter, Input, Output } from '@angular/core';
import {AddNewsFeedReaction, NewsFeedPublication, NewsFeedService, PublicationComment, ReactionType} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-reactions',
  templateUrl: './news-reactions.component.html',
  styleUrls: ['./news-reactions.component.scss']
})
export class ReactionsComponent {

  hide = true;

  constructor(private newsFeedService: NewsFeedService) { }

  @Input()
  public publication: NewsFeedPublication;

  public addReaction(reaction: ReactionType): void {
    this.newsFeedService.newsFeedPublicationIdReactionPost(this.publication.id, {reaction})
    .subscribe(resp => {
      this.publication.reactions.reactions.push(resp);
      this.publication.reactions.totalCount += 1;
    });
  }

  public hidden(): void {
    if (this.hide === true){
      setTimeout(() => {this.hide = false; }, 500);
    }
    else {
      setTimeout(() => {this.hide = true; }, 1000);
    }
  }
}
