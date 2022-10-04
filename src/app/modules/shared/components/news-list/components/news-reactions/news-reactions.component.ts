import { Component, Input } from '@angular/core';
import { NewsFeedPublication, NewsFeedService, ReactionType} from '../../../../../gateway-api';
import {ReactionsService} from '../../../../../../pages/home/entities/reactions.enum';

@Component({
  selector: 'app-news-reactions',
  templateUrl: './news-reactions.component.html',
  styleUrls: ['./news-reactions.component.scss']
})
export class ReactionsComponent {

  hide = true;

  constructor(private newsFeedService: NewsFeedService,
              public reactionsService: ReactionsService) { }

  @Input()
  public publication: NewsFeedPublication;
  public ReactionType = ReactionType;

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
        this.publication.reactions = resp;
      });
  }
}
