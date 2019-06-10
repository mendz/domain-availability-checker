import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import History from './containers/HistoryDomains/HistoryDomains';
import DomainList from './containers/DomainList/DomainList';

import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Switch>
          <Route path="/history" component={History} />
          <Route exact path="/" component={DomainList} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
