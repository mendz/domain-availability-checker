import React from 'react';
import PropTypes from 'prop-types';

import classes from './Textarea.module.css';

const Textarea = props => {
   let domains = '';
   if (props.value) {
      domains = props.value.map(domain => domain.name).join('\n');
   }
   return (
      <textarea
         className={classes.Textarea}
         onChange={props.change}
         value={domains}></textarea>
   );
};

Textarea.propTypes = {
   change: PropTypes.func,
   value: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      availability: PropTypes.bool
   }))
}

export default Textarea;