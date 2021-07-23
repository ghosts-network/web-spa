import { Component, Input } from '@angular/core';

@Component({
  selector: 'gn-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent {
  @Input()
  public reactions: Reactions;

  public asIcon(reaction: ReactionType): string {
    const dict = {
      0: '👍',
      1: '❤️',
      2: '😂',
      3: '😮',
      4: '😔',
      5: '😠'
    }

    return dict[reaction] || dict[0];
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
