import React from 'react';
import './app.css';
// import { Route } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Tick from './pages/Tick';

export function App() {
  return (
    <Tick />
    // <Router>
    //   <Switch>
    //     <Route path="/">
    //       <Home />
    //     </Route>
    //     <Route path="/chat">
    //       <Chat />
    //     </Route>
    //     <Route path="/tick">
    //       <Tick />
    //     </Route>
    //   </Switch>
    // </Router>
  );
}

export default App;
