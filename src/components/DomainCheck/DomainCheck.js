import React from 'react';
import PropTypes from 'prop-types';

import DomainCheckItem from './DomainCheckItem/DomainCheckItem';

import classes from './DomainCheck.module.css';

const DomainCheck = ({ listDomains }) => {
   const list = listDomains
      .map((domain, index) => (
         <DomainCheckItem
            key={`${domain.name}-${index}`}
            domainName={domain.name}
            availability={domain.availability}
            invalid={domain.invalid}
            networkError={domain.networkError} />
      ));

   return (
      <div className={classes.DomainCheck}>
         {list}
      </div>
   )
};

DomainCheck.propType = {
   listDomains: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      availability: PropTypes.bool.isRequired,
      networkError: PropTypes.bool.isRequired,
      invalid: PropTypes.bool.isRequired,
   })).isRequired,
}



export default DomainCheck;