import { ReactionButtonEnum } from './../../entities/reactions.enum';
import { Component, Input } from '@angular/core';
import { NewsFeedPublication, NewsFeedService, ReactionType} from '../../../../modules/gateway-api';

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
    if (this.publication.reactions.user == null || this.publication.reactions.user.type !== reaction) {
      this.newsFeedService.newsFeedPublicationIdReactionPost(this.publication.id, {reaction})
        .subscribe(resp => {
          this.publication.reactions = resp;
        });
    }
  }

  public deleteReaction(): void {
    this.newsFeedService.newsFeedPublicationIdReactionDelete(this.publication.id)
      .subscribe(resp => {
        this.publication.reactions = resp
      });
  }

  public get availableReactions() {
    return [0, 1, 2, 3, 4, 5].map(v => { return {index: v, url: ReactionButtonEnum[v]} });
  }

  public get userReaction() {
    if (this.publication.reactions.user == null) {
      return ReactionButtonEnum[0];
    }
    return ReactionButtonEnum[this.publication.reactions.user.type]
  }

  public get reactionName() {
    if (this.publication.reactions.user == null) {
      return ReactionType[0];
    }
    return ReactionType[this.publication.reactions.user.type]
  }
}
