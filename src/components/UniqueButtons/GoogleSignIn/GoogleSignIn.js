import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

import googleSignInSVG from '../../../assets/icons/btn_google_light_normal_ios.svg';

import classes from './GoogleSignIn.module.css';

const GoogleSignIn = ({ clicked }) => (
  <Button className={classes.GoogleLogin} onClick={clicked}>
    <div className={classes.Wrapper}>
      <img src={googleSignInSVG} alt="google sign in logo" />
      <span>Continue with Google</span>
    </div>
  </Button>
);

GoogleSignIn.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default GoogleSignIn;
