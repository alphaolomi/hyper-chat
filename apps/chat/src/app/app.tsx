import React from 'react';
import './app.css';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Chat from './pages/Chat';

export function App() {
  return (
    <div>
      <Route path="/" exact render={Home} />
      <Route path="/chat" exact render={Chat} />
    </div>
  );
}

export default App;
