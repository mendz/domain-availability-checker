import React from 'react';

import classes from './Header.module.css';

const Header = () => (
   <div className={classes.Header}>
      <h1 className={classes.Title}>Domain availability checker</h1>
      <p>
         Please enter a list of domains you wish to check.
         <br />
         The domains need to be separate by a new line.
      </p>
      <p>
         <small><strong>DISCLAIMER:</strong> Currently the site is using a DNS check, therefore sometimes the result could be a false positive.</small>
      </p>
   </div>
);

export default Header;
