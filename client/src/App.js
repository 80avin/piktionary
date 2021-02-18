import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import networkManager from './services/NetworkManager'
import GameUiPage from './containers/GameUiPage';
import Home from './containers/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFoundPage from './containers/NotFoundPage';

function App() {
  networkManager.init('/room');
  const socket = networkManager.getSocket();
  return (
    <Router>
      <Switch>
        <Route path='/' exact render={({ history, location, match }) => <Home {...{ history, location, match }} />} />
        <Route path='/room/:id'
          render={({ history, location, match }) =>
            <GameUiPage {...{ history, location, match }} socket={socket} />
          }
        />
        <Route render={({ history, location, match }) =>
          <NotFoundPage {...{ history, location, match }} />
        } />
      </Switch>
    </Router>
  )
}

export default App;
