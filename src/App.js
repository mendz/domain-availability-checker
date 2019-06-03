import React from 'react';
import DomainList from './containers/DomainList/DomainList';

import './App.css';

function App() {
  return (
    <div className="App">
      <p>Please enter a list of domains you wish to check.</p>
      <p>The domains need to be separate by comma or new line</p>
      <DomainList />
    </div>
  );
}

export default App;
