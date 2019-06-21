import React from 'react';
// import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import infoSvg from '../../../assets/icons/information-outline.svg';

import classes from './ButtonInfo.module.css';

const ButtonInfo = ({ clicked }) => {
   return (
      <Button className={classes.ButtonInfo} clicked={clicked}>
         <img src={infoSvg} alt="Copy" />
      </Button>
   )
}

export default ButtonInfo
