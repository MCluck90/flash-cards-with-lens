import React from 'react';
import { FlashCard } from '../types';
import './Card.css';

interface Props extends FlashCard {
  sideToShow: 'front' | 'back';
  onClick(): void;
}

export const Card: React.FC<Props> = ({ sideToShow, front, back, onClick }) => (
  <div
    className={`Card ${sideToShow === 'back' && 'Flipped'}`}
    onClick={onClick}
  >
    <div className="Card-Inner">
      <div className="Card-Front">
        <h1>{front}</h1>
      </div>
      <div className="Card-Back">
        <h1>{back}</h1>
      </div>
    </div>
  </div>
);
