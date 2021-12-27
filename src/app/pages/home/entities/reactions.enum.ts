import {ReactionType} from "../../../modules/gateway-api";

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
      1: '❤️',
      0: '👍',
      2: '😂',
      3: '😮',
      4: '😔',
      5: '😠'
    }

    return dict[reaction] || dict[0];
  }

  public asText(reaction: ReactionType): string {
    const dict = {
      1: 'Awesome️',
      0: 'Like',
      2: 'Lol',
      3: 'Wow',
      4: 'Sad',
      5: 'Angry'
    }

    return dict[reaction] || dict[0];
  }
}
