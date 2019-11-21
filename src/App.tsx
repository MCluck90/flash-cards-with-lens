import React from 'react';
import './App.css';
import { FlashCards } from './FlashCards/FlashCards';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <FlashCards />
      </header>
    </div>
  );
};

export { App };
