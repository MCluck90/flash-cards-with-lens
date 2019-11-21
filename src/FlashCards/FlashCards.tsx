import React from 'react';
import { FlashCard, AppState } from '../types';
import { connect, MapDispatchToProps } from 'react-redux';
import {
  getFlashCardsFromAppState,
  getSelectedCardIndexFromAppState,
  getSideToShowFromAppState
} from '../lenses';
import { flipCard, nextCard, shuffle, prevCard } from './effects';

interface StateProps {
  flashCards: FlashCard[];
  selectedCardIndex: number;
  sideToShow: 'front' | 'back';
}

interface DispatchProps {
  flipCard(): void;
  prevCard(): void;
  nextCard(): void;
  shuffle(): void;
}

type Props = StateProps & DispatchProps;

const FlashCardsComponent: React.FC<Props> = ({
  selectedCardIndex,
  sideToShow,
  flashCards,
  flipCard,
  prevCard,
  nextCard,
  shuffle
}) => (
  <div>
    <h1>{flashCards[selectedCardIndex][sideToShow]}</h1>
    <h3>
      {selectedCardIndex + 1} / {flashCards.length}
    </h3>
    <br />
    <button onClick={() => flipCard()}>Flip</button>
    <br />
    <button onClick={() => prevCard()}>Prev</button>
    <button onClick={() => nextCard()}>Next</button>
    <br />
    <button onClick={() => shuffle()}>Shuffle</button>
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  flashCards: getFlashCardsFromAppState.get(state),
  selectedCardIndex: getSelectedCardIndexFromAppState.get(state),
  sideToShow: getSideToShowFromAppState.get(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
  flipCard: () => dispatch(flipCard()),
  prevCard: () => dispatch(prevCard()),
  nextCard: () => dispatch(nextCard()),
  shuffle: () => dispatch(shuffle())
});

export const FlashCards = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashCardsComponent);
