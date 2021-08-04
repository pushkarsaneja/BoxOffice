import React from 'react';
import { Switch, Route } from 'react-router-dom';

const App = () => (
  <Switch>
    <Route exact path="/">
      This is home page.
    </Route>
    <Route exact path="/starred">
      This is starred.
    </Route>
    <Route>This page does not exist.</Route>
  </Switch>
);
export default App;
