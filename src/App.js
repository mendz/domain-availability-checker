import React from 'react';
import DomainList from './containers/DomainList/DomainList';

import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <h1 className={classes.Title}>Domain availability checker</h1>
      <p>
        Please enter a list of domains you wish to check.
        <br />
        The domains need to be separate by a new line.
      </p>
      <DomainList />
    </div>
  );
}

export default App;
