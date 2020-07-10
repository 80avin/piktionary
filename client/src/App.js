import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import GameUiContainer from './containers/GameUiContainer';

function App() {
  const socket = io(prompt('Enter room code', '/room'));
  return (
    <div>
      <GameUiContainer socket={socket}/>
    </div>
  )
}

export default App;
