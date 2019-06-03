import React from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import DomainCheckItem from './DomainCheckItem/DomainCheckItem';

import classes from './DomainCheck.module.css';

const DomainCheck = props => {
   const list = props.listDomains
      .filter(domain => domain.name.trim() !== '')
      .map(domain => {
         let invalid = false;
         if (props.invalidDomains.find(invalidDomain => invalidDomain === domain.name)) {
            invalid = true;
         }

         return (
            <DomainCheckItem
               key={uuidv4()}
               domainName={domain.name}
               availability={domain.availability}
               invalid={invalid} />
         )
      });

   return (
      <div className={classes.DomainCheck}>
         {list}
      </div>
   )
};

DomainCheck.propType = {
   listDomains: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      availability: PropTypes.bool
   })),
   invalidDomains: PropTypes.arrayOf(PropTypes.string)
}



export default DomainCheck;