import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FlashCards } from './FlashCards/FlashCards';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FlashCards />
      </header>
    </div>
  );
};

export { App };
