export interface FlashCardsSet {
  readonly id: string;
  readonly title: string;
  readonly cards: Array<FlashCard>;
}

interface FlashCard {
  readonly id: string;
  readonly definition: string;
  readonly description: string;
  readonly examples: Array<string>;
}
