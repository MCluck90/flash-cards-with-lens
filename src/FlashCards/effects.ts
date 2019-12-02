import { select, takeLatest, put, delay } from '@redux-saga/core/effects';
import {
  selectSideToShow,
  selectSelectedCardIndex,
  getFlashCardsFromAppState,
  getFirstSideFromAppState
} from '../lenses';
import { updateState } from '@myopia/optics';
import { AppState, FlashCard } from '../types';

export const flipCard = () => ({
  type: 'FLIP_TODO'
});

export const prevCard = () => ({
  type: 'PREV_CARD'
});

export const nextCard = () => ({
  type: 'NEXT_CARD'
});

export const shuffle = () => ({
  type: 'SHUFFLE'
});

export const switchFirstSide = () => ({
  type: 'SWITCH_FIRST_SIDE'
});

export const loadFlashCards = (flashCards: FlashCard[]) => ({
  type: 'LOAD_FLASH_CARDS',
  payload: flashCards
});

function* flipCardSaga() {
  type Side = ReturnType<typeof selectSideToShow['get']>;
  const sideToShow: Side = yield select(selectSideToShow.get);
  const newSideToShow: Side = sideToShow === 'front' ? 'back' : 'front';
  yield put(updateState<AppState>(selectSideToShow.set(newSideToShow)));
}

function* prevCardSaga() {
  const selectedCardIndex: number = yield select(selectSelectedCardIndex.get);
  const flashCards: FlashCard[] = yield select(getFlashCardsFromAppState.get);
  const numOfCards = flashCards.length;

  // Reset to the first side before moving to the previous card
  const firstSide: AppState['firstSide'] = yield select(
    getFirstSideFromAppState.get
  );
  yield put(updateState<AppState>(selectSideToShow.set(firstSide)));
  yield delay(400);

  const nextSelected =
    selectedCardIndex - 1 < 0 ? numOfCards - 1 : selectedCardIndex - 1;
  yield put(updateState<AppState>(selectSelectedCardIndex.set(nextSelected)));
}

function* nextCardSaga() {
  const selectedCardIndex: number = yield select(selectSelectedCardIndex.get);
  const flashCards: FlashCard[] = yield select(getFlashCardsFromAppState.get);
  const numOfCards = flashCards.length;

  // Reset to the first side before moving to the next card
  const firstSide: AppState['firstSide'] = yield select(
    getFirstSideFromAppState.get
  );
  yield put(updateState<AppState>(selectSideToShow.set(firstSide)));
  yield delay(400);

  const nextSelected = (selectedCardIndex + 1) % numOfCards;
  yield put(updateState<AppState>(selectSelectedCardIndex.set(nextSelected)));
}

function* shuffleSaga() {
  const flashCards: FlashCard[] = yield select(getFlashCardsFromAppState.get);
  const newOrderFlashCards = [...flashCards];
  newOrderFlashCards.sort((a, b) => (Math.random() > 0.5 ? 1 : -1));
  yield put(updateState(getFlashCardsFromAppState.set(newOrderFlashCards)));

  // Reset to the first card and flip back to the first side
  const firstSide: AppState['firstSide'] = yield select(
    getFirstSideFromAppState.get
  );
  yield put(updateState(selectSelectedCardIndex.set(0)));
  yield put(updateState<AppState>(selectSideToShow.set(firstSide)));
}

function* switchFirstSideSaga() {
  const firstSide: AppState['firstSide'] = yield select(
    getFirstSideFromAppState.get
  );
  const newFirstSide = firstSide === 'front' ? 'back' : 'front';
  yield put(updateState(getFirstSideFromAppState.set(newFirstSide)));

  // Switch to the new first side
  yield put(updateState<AppState>(selectSideToShow.set(newFirstSide)));
}

function* loadFlashCardsSaga({ payload }: ReturnType<typeof loadFlashCards>) {
  yield put(updateState(getFlashCardsFromAppState.set(payload)));
}

export const flashCardsSagas = [
  takeLatest('FLIP_TODO', flipCardSaga),
  takeLatest('PREV_CARD', prevCardSaga),
  takeLatest('NEXT_CARD', nextCardSaga),
  takeLatest('SHUFFLE', shuffleSaga),
  takeLatest('SWITCH_FIRST_SIDE', switchFirstSideSaga),
  takeLatest('LOAD_FLASH_CARDS', loadFlashCardsSaga)
];
