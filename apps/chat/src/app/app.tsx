import React from 'react';
import { SocketContext, socket } from './context/socket';
import './app.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Tick from './pages/Tick';
import About from './pages/About';

export function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/tick">
            <Tick />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
