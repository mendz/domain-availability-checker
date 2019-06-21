import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../UI/Spinner/Spinner';
import ButtonCopy from '../../UniqueButtons/ButtonCopy/ButtonCopy';
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
      <div className={classes.Container}>
         <ButtonCopy copyText={domainName}/>
         <div className={containerClass.join(' ')}>
            <span className={classes.Name}>
               <a href={`http://${domainName}`} target="_blank" rel="noopener noreferrer">{name}</a>
            </span>
            <span className={classes.Availability}>{isAvailable}</span>
         </div>
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