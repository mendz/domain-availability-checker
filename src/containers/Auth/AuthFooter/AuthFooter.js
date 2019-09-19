import React from 'react';
import PropTypes from 'prop-types';

import { IS_LOGIN, IS_SIGN_UP, IS_FORGOT_PASSWORD } from '../Auth';

import classes from './AuthFooter.module.css';

const Footer = ({ formType, changeFormType }) => {
  let footer = (
    <>
      <p>
        Don't have an account?{' '}
        <span
          className={classes.Link}
          onClick={() => changeFormType(IS_SIGN_UP)}
        >
          Sign Up
        </span>
        .
      </p>
      <p>
        or{' '}
        <span
          className={classes.Link}
          onClick={() => changeFormType(IS_FORGOT_PASSWORD)}
        >
          Forgot your password
        </span>
        ?
      </p>
    </>
  );

  if (formType === IS_SIGN_UP) {
    footer = (
      <p>
        Already have an account?{' '}
        <span className={classes.Link} onClick={() => changeFormType(IS_LOGIN)}>
          Log In
        </span>
        .
      </p>
    );
  }

  if (formType === IS_FORGOT_PASSWORD) {
    footer = (
      <>
        <p>
          After submit, please check your email for the rest password email.
        </p>
        <p>
          Already have an account?{' '}
          <span
            className={classes.Link}
            onClick={() => changeFormType(IS_LOGIN)}
          >
            Log In
          </span>
          .
        </p>
      </>
    );
  }
  return footer;
};

Footer.propTypes = {
  formType: PropTypes.string.isRequired,
  changeFormType: PropTypes.func.isRequired,
};

export default Footer;
