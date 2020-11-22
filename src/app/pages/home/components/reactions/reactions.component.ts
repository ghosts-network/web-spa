import { Component, EventEmitter, Input, Output } from '@angular/core';
import {AddNewsFeedReaction, NewsFeedPublication, NewsFeedService, PublicationComment, ReactionType} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent {

  constructor(private newsFeedService: NewsFeedService) { }

  @Input()
  public publication: NewsFeedPublication;

  public addReaction(reaction: ReactionType): void {
    this.newsFeedService.newsFeedPublicationIdReactionPost(this.publication.id, {reaction})
    .subscribe(resp => {
      this.publication.reactions.reactions.push(resp);
    });
  }
}
