export interface FlashCardsSet {
  readonly id: string;
  readonly title: string;
  readonly cards: Array<FlashCard>;
  readonly progress: FlashCardsSetUserProgress;
}

interface FlashCardsSetUserProgress {
  fraction: number;
  cardsProgress: Map<string, number>;
}

interface FlashCard {
  readonly id: string;
  readonly definition: string;
  readonly description: string;
  readonly examples: Array<string>;
}
