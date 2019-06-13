import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../UI/Spinner/Spinner';
import SymbolsCheck from '../../UI/SymbolsCheck/SymbolsCheck';

import classes from './DomainCheckItem.module.css';

const DomainCheckItem = ({ domainName, availability, invalid, networkError }) => {
   let isAvailable = <Spinner />;
   const containerClass = [classes.DomainCheckItem];

   // set the symbol information
   if (invalid || networkError) {
      isAvailable = <SymbolsCheck type="error" />;
      containerClass.push(classes.Invalid);
   } else if (availability === false) {
      isAvailable = <SymbolsCheck type="fail" />;
      containerClass.push(classes.Invalid);
   } else if (availability === true) {
      isAvailable = <SymbolsCheck type="success" />;
      containerClass.push(classes.Success);
   }

   // set the domain name information
   let name = domainName;
   if (invalid || networkError) {
      let errorMessage = '';
      if (invalid) {
         errorMessage = 'NOT VALID DOMAIN!';
      } else {
         errorMessage = 'NETWORK ERROR!';
      }

      name += ` - ${errorMessage}`;
   }

   return (
      <div className={containerClass.join(' ')}>
         <div className={classes.Name}>{name}</div>
         <div className={classes.Availability}>{isAvailable}</div>
      </div>
   );
};

DomainCheckItem.propTypes = {
   domainName: PropTypes.string,
   availability: PropTypes.bool,
   invalid: PropTypes.bool,
   networkError: PropTypes.bool
}

export default DomainCheckItem;