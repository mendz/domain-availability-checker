import React from 'react';
import SymbolsCheck from '../UI/SymbolsCheck/SymbolsCheck';

import classes from './Info.module.css';

const Info = () => {
   return (
      <div className={classes.Info}>
         <h1>Legend</h1>
         <p>
            <SymbolsCheck type="success"/> - The domain is available.
         </p>
         <p>
            <SymbolsCheck type="fail"/> - The domain is unavailable.
         </p>
         <p>
            <SymbolsCheck type="error"/> - Something went wrong.
         </p>
         <hr />
         <h2>DISCLAIMER</h2>
         <p>
            <small>Currently, the site is using a DNS check to find if the domain has IPs or not, therefore sometimes the result could be false positive.</small>
         </p>
      </div>
   )
}

export default Info;
