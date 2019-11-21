import { select, takeLatest, put } from '@redux-saga/core/effects';
import {
  selectSideToShow,
  selectSelectedCardIndex,
  getFlashCardsFromAppState
} from '../lenses';
import { updateState } from '@myopia/optics';
import { AppState, FlashCard } from '../types';

export const flipCard = () => ({
  type: 'FLIP_TODO'
});

export const nextCard = () => ({
  type: 'NEXT_CARD'
});

function* flipCardSaga() {
  type Side = ReturnType<typeof selectSideToShow['get']>;
  const sideToShow: Side = yield select(selectSideToShow.get);
  const newSideToShow: Side = sideToShow === 'front' ? 'back' : 'front';
  yield put(updateState<AppState>(selectSideToShow.set(newSideToShow)));
}

function* nextCardSaga() {
  const selectedCardIndex: number = yield select(selectSelectedCardIndex.get);
  const flashCards: FlashCard[] = yield select(getFlashCardsFromAppState.get);
  const numOfCards = flashCards.length;
  const nextSelected = (selectedCardIndex + 1) % numOfCards;
  yield put(updateState<AppState>(selectSelectedCardIndex.set(nextSelected)));

  // Reset to the front
  yield put(updateState<AppState>(selectSideToShow.set('front')));
}

export const flashCardsSagas = [
  takeLatest('FLIP_TODO', flipCardSaga),
  takeLatest('NEXT_CARD', nextCardSaga)
];
