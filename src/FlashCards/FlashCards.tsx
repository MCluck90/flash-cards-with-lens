import React from 'react';
import { FlashCard, AppState } from '../types';
import { connect, MapDispatchToProps } from 'react-redux';
import {
  getFlashCardsFromAppState,
  getSelectedCardIndexFromAppState,
  getSideToShowFromAppState,
  getFirstSideFromAppState
} from '../lenses';
import {
  flipCard,
  nextCard,
  shuffle,
  prevCard,
  loadFlashCards,
  switchFirstSide
} from './effects';
import { Card } from '../Card/Card';
import './FlashCards.css';

interface StateProps {
  flashCards: FlashCard[];
  selectedCardIndex: number;
  sideToShow: 'front' | 'back';
  firstSide: 'front' | 'back';
}

interface DispatchProps {
  flipCard(): void;
  prevCard(): void;
  nextCard(): void;
  shuffle(): void;
  switchFirstSide(): void;
  loadFlashCards(flashCards: FlashCard[]): void;
}

type Props = StateProps & DispatchProps;

const FlashCardsComponent: React.FC<Props> = ({
  selectedCardIndex,
  sideToShow,
  firstSide,
  flashCards,
  flipCard,
  prevCard,
  nextCard,
  shuffle,
  switchFirstSide,
  loadFlashCards
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    Promise.all<FlashCard[]>(
      Array.from(event.target.files).map(
        file =>
          new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = evt => {
              if (!evt.target || typeof evt.target.result !== 'string') {
                return;
              }
              const flashCards: FlashCard[] = JSON.parse(evt.target.result);
              resolve(flashCards);
            };
          })
      )
    ).then(allFlashCards => {
      loadFlashCards(allFlashCards.flat());
    });
  };
  const oppositeFirstSide = firstSide === 'front' ? 'back' : 'front';
  return (
    <div className="FlashCards">
      <h3>
        {selectedCardIndex + 1} / {flashCards.length}
      </h3>
      <button onClick={() => switchFirstSide()}>
        Show {oppositeFirstSide} first
      </button>
      <br />
      <button className="Shuffle" onClick={() => shuffle()}>
        Shuffle
      </button>
      <div className="FlashCards-Container">
        <button className="Previous" onClick={() => prevCard()}>
          Prev
        </button>
        <Card
          {...flashCards[selectedCardIndex]}
          sideToShow={sideToShow}
          onClick={() => flipCard()}
        />
        <button className="Next" onClick={() => nextCard()}>
          Next
        </button>
      </div>
      <input
        id="file"
        type="file"
        accept="application/json"
        onChange={onChange}
        multiple
      />
      <label htmlFor="file">Choose one or more files</label>
    </div>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  flashCards: getFlashCardsFromAppState.get(state),
  selectedCardIndex: getSelectedCardIndexFromAppState.get(state),
  sideToShow: getSideToShowFromAppState.get(state),
  firstSide: getFirstSideFromAppState.get(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
  flipCard: () => dispatch(flipCard()),
  prevCard: () => dispatch(prevCard()),
  nextCard: () => dispatch(nextCard()),
  shuffle: () => dispatch(shuffle()),
  switchFirstSide: () => dispatch(switchFirstSide()),
  loadFlashCards: (flashCards: FlashCard[]) =>
    dispatch(loadFlashCards(flashCards))
});

export const FlashCards = connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashCardsComponent);
