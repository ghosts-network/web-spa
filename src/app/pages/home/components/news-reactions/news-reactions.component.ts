import { Component, Input } from '@angular/core';
import { NewsFeedPublication, NewsFeedService, ReactionType} from '../../../../modules/gateway-api';
import {ReactionsEnum} from "../../entities/reactions.enum";

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
      this.publication.reactions.reactions = resp[0].reactions;
      this.publication.reactions.totalCount = resp[0].totalCount;
    });
  }

  public get availableReactions() {
    return [0, 1, 2, 3, 4, 5].map(v => { return {index: v, url: ReactionsEnum[v]} });
  }

  public hidden(): void {
    if (this.hide === true){
      setTimeout(() => {this.hide = false; }, 300);
    }
    else {
      setTimeout(() => {this.hide = true; }, 600);
    }
  }
}
