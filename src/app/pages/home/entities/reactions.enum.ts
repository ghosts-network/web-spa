import {ReactionType} from '@gn/api';

export class ReactionsService {
  public get all(): Array<ReactionType> {
    return [
      ReactionType.Love,
      ReactionType.Like,
      ReactionType.Haha,
      ReactionType.Wow,
      ReactionType.Sad,
      ReactionType.Angry
    ];
  }

  public asIcon(reaction: ReactionType): string {
    const dict = {
      Love: '❤️',
      Like: '👍',
      Haha: '😂',
      Wow: '😮',
      Sad: '😔',
      Angry: '😠'
    };

    return dict[reaction];
  }
}
