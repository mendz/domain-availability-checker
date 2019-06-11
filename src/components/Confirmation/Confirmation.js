import React from 'react';
import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';

import classes from './Confirmation.module.css';

const Confirmation = ({ clickedOK, clickedCancel }) => {
   return (
      <div className={classes.Confirmation}>
         <p>Are you sure?</p>
         <div className={classes.Buttons}>
            <Button clicked={clickedOK}>OK</Button>
            <Button clicked={clickedCancel}>Cancel</Button>
         </div>
      </div>
   )
}

Confirmation.propTypes = {
   clickedOK: PropTypes.func,
   clickedCancel: PropTypes.func,
}

export default Confirmation;
