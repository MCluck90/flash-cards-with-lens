import { Lens, fromTraversable } from 'monocle-ts';
import { array } from 'fp-ts/lib/Array';
import { AppState, FlashCard } from './types';

export const getFlashCardsFromAppState = Lens.fromProp<AppState>()(
  'flashCards'
);
export const getSelectedCardIndexFromAppState = Lens.fromProp<AppState>()(
  'selectedCardIndex'
);
export const getSideToShowFromAppState = Lens.fromProp<AppState>()(
  'sideToShow'
);
export const selectSelectedCardIndex = getSelectedCardIndexFromAppState;
export const selectSideToShow = getSideToShowFromAppState;
export const getFrontFromFlashCard = Lens.fromProp<FlashCard>()('front');
export const getBackFromFlashCard = Lens.fromProp<FlashCard>()('back');

const flashcardsTraversal = fromTraversable(array)<FlashCard>();
export const selectFlashCardsFromAppState = getFlashCardsFromAppState.composeTraversal(
  flashcardsTraversal
);
