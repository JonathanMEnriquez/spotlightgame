import React, { Component } from 'react';
import './App.css';
import GameProvider from './GameProvider';
import GameSwitch from './GameSwitch';

class App extends  Component {

  render() {
    return (
      <GameProvider>
        <GameSwitch />
      </GameProvider>
    );
  }
}

export default App;
