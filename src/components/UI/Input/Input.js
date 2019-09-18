import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

import { ReactComponent as OpenEye } from '../../../assets/icons/_ionicons_svg_md-eye.svg';
import { ReactComponent as CloseEye } from '../../../assets/icons/_ionicons_svg_md-eye-off.svg';

const Input = ({
  label,
  elementConfig: { type, placeholder },
  changed,
  invalid,
  touched,
  value,
  errorMessage,
}) => {
  const [isFocus, setIsFocus] = useState(false); // to show the error only when the input us un-focus
  const [showPassword, setShowPassword] = useState(false);
  const classArr = [classes.Input];

  if (invalid && touched && !isFocus) {
    classArr.push(classes.Invalid);
  }

  let validationError = null;
  if (invalid && touched && !isFocus) {
    const errorMsg = errorMessage
      ? errorMessage
      : `Please enter valid ${label}`;
    validationError = <p className={classes.ValidationError}>{errorMsg}</p>;
  }

  let showPassButton = null;
  if (type === 'password') {
    showPassButton = (
      <button
        className={classes.ShowPasswordButton}
        onClick={() => setShowPassword(!showPassword)}
      >
        {!showPassword ? (
          <OpenEye height="1.2rem" width="1.2rem" />
        ) : (
          <CloseEye height="1.2rem" width="1.2rem" />
        )}
      </button>
    );
  }

  return (
    <div className={classes.Container}>
      <label htmlFor={type} className={classes.Label}>
        {label}
      </label>
      <div className={classes.InputWrapper}>
        <input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          name={type}
          id={type}
          className={classArr.join(' ')}
          onChange={changed}
          value={value}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        {showPassButton}
      </div>
      {validationError}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  }).isRequired,
  changed: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default Input;
