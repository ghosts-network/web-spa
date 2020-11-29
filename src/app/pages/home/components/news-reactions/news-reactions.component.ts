import { ReactionsUrl } from './reactions-url';
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
    this.newsFeedService.newsFeedPublicationIdReactionPost(this.publication.id, {reaction})
    .subscribe(resp => {
      if (!this.publication.reactions.reactions.includes(reaction)){
        this.publication.reactions.reactions.push(reaction);
      }
      this.publication.reactions.totalCount += 1;
    });
  }

  public get replaceReaction(): string[] {
    return this.publication.reactions.reactions.map((value) => ReactionsUrl[value]);
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
