import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import DomainCheckItem from './DomainCheckItem/DomainCheckItem';

import classes from './DomainCheck.module.css';

const DomainCheck = ({ listDomains }) => {
   const list = listDomains
      .map(domain => (
         <DomainCheckItem
            key={uuidv4()}
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
      name: PropTypes.string,
      availability: PropTypes.bool,
      networkError: PropTypes.bool,
      invalid: PropTypes.bool,
   }))
}



export default DomainCheck;