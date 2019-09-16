import React from 'react';
import PropTypes from 'prop-types';

import classes from './Textarea.module.css';

const Textarea = ({ change, value, ...props }) => (
  <textarea
    className={classes.Textarea}
    onChange={change}
    value={value}
    {...props}
  />
);

Textarea.propTypes = {
  change: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Textarea;
