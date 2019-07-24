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
      </div>
   )
}

export default Info;
