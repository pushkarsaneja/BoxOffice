import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Starred from './pages/Starred';

const App = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/starred">
      <Starred />
    </Route>
    <Route>This page does not exist.</Route>
  </Switch>
);
export default App;
