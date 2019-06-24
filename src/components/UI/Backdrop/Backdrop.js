import React from 'react'
import PropTypes from 'prop-types';

import classes from './Backdrop.module.css';

const Backdrop = ({ closed }) => {
   return (
      <div className={classes.Backdrop} onClick={closed} />
   )
}

Backdrop.propTypes = {
   closed: PropTypes.func.isRequired
}

export default Backdrop
