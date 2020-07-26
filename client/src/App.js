import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import GameUiContainer from './containers/GameUiContainer';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  const socket = io(prompt('Enter room code', '/room'));
  return (
    <div>
    <Router>
      <Route path='/' exact component='span'></Route>
    </Router>
      <GameUiContainer socket={socket}/>
    </div>
  )
}

export default App;
