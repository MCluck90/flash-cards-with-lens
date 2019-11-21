import React from 'react';
import { FlashCard, AppState } from '../types';
import { connect, MapDispatchToProps } from 'react-redux';
import {
  getFlashCardsFromAppState,
  getSelectedCardIndexFromAppState,
  getSideToShowFromAppState
} from '../lenses';
import { flipCard, nextCard } from './effects';

interface StateProps {
  flashCards: FlashCard[];
  selectedCardIndex: number;
  sideToShow: 'front' | 'back';
}

interface DispatchProps {
  flipCard(): void;
  nextCard(): void;
}

type Props = StateProps & DispatchProps;

const FlashCardsComponent: React.FC<Props> = ({
  selectedCardIndex,
  sideToShow,
  flashCards,
  flipCard,
  nextCard
}) => (
  <div>
    <h1>{flashCards[selectedCardIndex][sideToShow]}</h1>
    <br />
    <button onClick={() => flipCard()}>Flip</button>
    <br />
    <button onClick={() => nextCard()}>Next</button>
  </div>
);

const mapStateToProps = (state: AppState): StateProps => ({
  flashCards: getFlashCardsFromAppState.get(state),
  selectedCardIndex: getSelectedCardIndexFromAppState.get(state),
  sideToShow: getSideToShowFromAppState.get(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
  flipCard: () => dispatch(flipCard()),
  nextCard: () => dispatch(nextCard())
});

export const FlashCards = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashCardsComponent);
