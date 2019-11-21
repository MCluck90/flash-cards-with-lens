import React from 'react';
import { FlashCard, AppState } from '../types';
import { connect } from 'react-redux';
import { getFlashCardsFromAppState } from '../lenses';

interface Props {
  flashCards: FlashCard[];
}

const FlashCardsComponent: React.FC<Props> = ({ flashCards }) => (
  <ul>
    {flashCards.map(({ front, back }) => (
      <li key={`${front}:${back}`}>
        {front}: {back}
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state: AppState): Props => ({
  flashCards: getFlashCardsFromAppState.get(state)
});

export const FlashCards = connect(mapStateToProps)(FlashCardsComponent);
