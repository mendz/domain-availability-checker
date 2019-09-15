import React from 'react';
import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';

import classes from './Confirmation.module.css';

const Confirmation = ({ clickedOK, clickedCancel, additionalText }) => (
  <div className={classes.Confirmation}>
    <p>Are you sure?</p>
    {additionalText && (
      <p className={classes.AdditionalText}>{additionalText}</p>
    )}
    <div className={classes.Buttons}>
      <Button onClick={clickedOK}>OK</Button>
      <Button onClick={clickedCancel}>Cancel</Button>
    </div>
  </div>
);

Confirmation.propTypes = {
  clickedOK: PropTypes.func.isRequired,
  clickedCancel: PropTypes.func.isRequired,
  additionalText: PropTypes.string,
};

export default Confirmation;
