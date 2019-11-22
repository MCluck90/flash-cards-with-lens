import React from 'react';
import './App.css';
import { FlashCards } from './FlashCards/FlashCards';

const App: React.FC = () => {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
};

export { App };
