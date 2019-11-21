import { createStore, applyMiddleware, compose } from 'redux';
import { reducer, OpticsAction, updateState } from '@myopia/optics';
import createSagaMiddleware from 'redux-saga';

import { AppState } from './types';

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
