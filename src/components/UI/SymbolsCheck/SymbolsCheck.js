import React from 'react'
import PropTypes from 'prop-types';

import classes from './SymbolsCheck.module.css';

const SymbolsCheck = ({ type }) => {
   let symbol = null;

   switch (type) {
      case 'success':
         symbol = <span className={classes.Success}>✔</span>;
         break;
      case 'fail':
         symbol = <span className={classes.Fail}>✖</span>;
         break;
      default:
         break;
   }

   return symbol;
}

SymbolsCheck.propTypes = {
   type: PropTypes.string.isRequired
}

export default SymbolsCheck
