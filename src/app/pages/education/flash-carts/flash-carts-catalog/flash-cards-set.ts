export interface FlashCardsSet {
  readonly id: string;
  readonly title: string;
  readonly details: FlashCardsSetInfo;
}

interface FlashCardsSetInfo {
  readonly totalCards: number;
}
