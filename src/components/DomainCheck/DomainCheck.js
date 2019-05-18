import React from 'react';
import PropTypes from 'prop-types';
import uuidv5 from 'uuid/v5';

import DomainCheckItem from './DomainCheckItem/DomainCheckItem';

import classes from './DomainCheck.module.css';

const DomainCheck = props => {
   const list = props.listDomains.map(domain =>
      <DomainCheckItem
      key={uuidv5(domain.name, uuidv5.DNS)}
      domainName={domain.name}
      availability={domain.availability} />
   );

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
   }))
}



export default DomainCheck;