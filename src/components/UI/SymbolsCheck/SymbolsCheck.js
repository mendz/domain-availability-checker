import React from 'react';
import PropTypes from 'prop-types';

import classes from './SymbolsCheck.module.css';

const SymbolsCheck = ({ type }) => {
  let symbol = null;

  switch (type) {
    case 'available':
      symbol = (
        <span className={classes.Available} data-filter-type="available">
          ✔
        </span>
      );
      break;
    case 'unavailable':
      symbol = (
        <span className={classes.Unavailable} data-filter-type="unavailable">
          ✖
        </span>
      );
      break;
    case 'error':
      symbol = <span className={classes.Fail}>ERROR</span>;
      break;
    default:
      break;
  }

  return symbol;
};

SymbolsCheck.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SymbolsCheck;
