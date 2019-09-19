import React from 'react';
import PropTypes from 'prop-types';

import classes from './Spinner.module.css';

const Spinner = ({ center }) => {
  const classArr = [classes.Spinner];

  if (center) {
    classArr.push(classes.Center);
  }

  return <div className={classArr.join(' ')}></div>;
};

Spinner.propTypes = {
  center: PropTypes.bool,
};

export default Spinner;
