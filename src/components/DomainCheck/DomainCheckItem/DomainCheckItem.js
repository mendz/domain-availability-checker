import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../UI/Spinner/Spinner';

import classes from './DomainCheckItem.module.css';

const DomainCheckItem = ({ domainName, availability, invalid, networkError }) => {
   let isAvailable = <Spinner />;
   const availabilityClass = [classes.Availability];

   if (availability === false) {
      isAvailable = '❌';
   } else if (availability === true) {
      isAvailable = '✔';
      availabilityClass.push(classes.Green);
   }

   let name = domainName;
   let classDomainName = [classes.Name];
   if (invalid || networkError) {
      classDomainName.push(classes.Invalid);
      let errorMessage = '';
      if (invalid) {
         errorMessage = 'NOT VALID DOMAIN!';
      } else {
         errorMessage = 'NETWORK ERROR!';
      }

      name += `- ${errorMessage}`;
   }
   return (
      <div className={classes.DomainCheckItem}>
         <div className={classDomainName.join(' ')}>{name}</div>
         <div className={availabilityClass.join(' ')}>{isAvailable}</div>
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