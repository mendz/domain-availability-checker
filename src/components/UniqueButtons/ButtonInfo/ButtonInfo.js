import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import infoSvg from '../../../assets/icons/information-outline.svg';

import classes from './ButtonInfo.module.css';

const ButtonInfo = ({ clicked, disabled }) => (
  <Button className={classes.ButtonInfo} onClick={clicked} disabled={disabled}>
    <img src={infoSvg} alt="Info" />
  </Button>
);

ButtonInfo.propTypes = {
  clicked: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ButtonInfo;
