import { Component, Input } from '@angular/core';
import {ReactionsService} from '../../../../pages/home/entities/reactions.enum';

@Component({
  selector: 'gn-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent {
  @Input()
  public reactions: Reactions;

  constructor(public reactionsService: ReactionsService) {
  }
}

export enum ReactionType {
  Like,
  Love,
  Haha,
  Wow,
  Sad,
  Angry
}

export interface Reactions {
  totalCount: number;
  types: ReactionType[];
}
