export interface FlashCard {
  front: string;
  back: string;
}

export interface AppState {
  flashCards: FlashCard[];
  selectedCardIndex: number;
  sideToShow: 'front' | 'back';
}
