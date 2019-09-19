import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

import googleSignInSVG from '../../../assets/icons/btn_google_light_normal_ios.svg';

import classes from './GoogleSignIn.module.css';

const GoogleSignIn = ({ clicked, disabled }) => (
  <Button className={classes.GoogleLogin} onClick={clicked} disabled={disabled}>
    <div className={classes.Wrapper}>
      <img src={googleSignInSVG} alt="google sign in logo" />
      <span>Continue with Google</span>
    </div>
  </Button>
);

GoogleSignIn.propTypes = {
  clicked: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default GoogleSignIn;
