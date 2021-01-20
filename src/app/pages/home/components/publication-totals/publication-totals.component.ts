import {Component, Input} from '@angular/core';
import {NewsFeedPublication} from "../../../../modules/gateway-api";
import {ReactionsService} from "../../entities/reactions.enum";

@Component({
  selector: 'app-publication-totals',
  templateUrl: './publication-totals.component.html',
  styleUrls: ['./publication-totals.component.scss']
})
export class PublicationTotalsComponent {

  constructor(private reactionsService: ReactionsService) {
  }

  @Input() publication: NewsFeedPublication;

  public get displayedReactions(): string[] {
    return this.publication.reactions.reactions.map(r => this.reactionsService.asIcon(r));
  }

}
