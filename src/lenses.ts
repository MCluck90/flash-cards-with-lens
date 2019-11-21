import { Lens, fromTraversable } from 'monocle-ts';
import { array } from 'fp-ts/lib/Array';
import { AppState, FlashCard } from './types';

export const getFlashCardsFromAppState = Lens.fromProp<AppState>()(
  'flashCards'
);
const flashcardsTraversal = fromTraversable(array)<FlashCard>();
export const getFrontFromFlashCard = Lens.fromProp<FlashCard>()('front');
export const getBackFromFlashCard = Lens.fromProp<FlashCard>()('back');

export const selectFrontFromAppState = getFlashCardsFromAppState
  .composeTraversal(flashcardsTraversal)
  .composeLens(getFrontFromFlashCard);
export const selectBackFromAppState = getFlashCardsFromAppState
  .composeTraversal(flashcardsTraversal)
  .composeLens(getBackFromFlashCard);
export const selectFlashCardsFromAppState = getFlashCardsFromAppState.composeTraversal(
  flashcardsTraversal
);
