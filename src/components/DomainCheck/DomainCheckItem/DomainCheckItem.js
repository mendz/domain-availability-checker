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

   let name = props.domainName
   let classDomainName = [classes.Name]
   if (props.invalid) {
      name += '- NOT VALID DOMAIN!';
      classDomainName.push(classes.Invalid);
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
   invalid: PropTypes.bool
}

export default DomainCheckItem;