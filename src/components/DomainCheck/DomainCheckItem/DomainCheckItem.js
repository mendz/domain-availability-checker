import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../UI/Spinner/Spinner';

import classes from './DomainCheckItem.module.css';

const DomainCheckItem = props => {
   let isAvailable = <Spinner />
   const availabilityClass = [classes.Availability];

   if (props.availability === false) {
      isAvailable = '❌';
   } else if (props.availability === true) {
      isAvailable = '✔';
      availabilityClass.push(classes.Green);
   }

   return (
      <div className={classes.DomainCheckItem}>
         <div className={classes.Name}>{props.domainName}</div>
         <div className={availabilityClass.join(' ')}>{isAvailable}</div>
      </div>
   );
};

DomainCheckItem.propTypes = {
   domainName: PropTypes.string,
   availability: PropTypes.bool
}

export default DomainCheckItem;