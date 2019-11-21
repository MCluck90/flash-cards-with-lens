import { createStore, applyMiddleware, compose } from 'redux';
import { reducer, OpticsAction, updateState } from '@myopia/optics';
import createSagaMiddleware from 'redux-saga';
import { AppState } from './types';
import { flashCardsSagas } from './FlashCards/effects';
import { all } from '@redux-saga/core/effects';

function* sagas() {
  yield all([...flashCardsSagas]);
}

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore<AppState, OpticsAction<AppState>, void, void>(
  reducer,
  enhancer
);

// Setup initial state
store.dispatch(
  updateState<AppState>(_ => ({
    sideToShow: 'front',
    selectedCardIndex: 0,
    flashCards: [
      {
        front: 'A',
        back: 'a'
      },
      {
        front: 'B',
        back: 'b'
      },
      {
        front: 'C',
        back: 'c'
      }
    ]
  }))
);

sagaMiddleware.run(sagas);
