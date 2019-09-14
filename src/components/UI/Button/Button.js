import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

// TODO: remove clicked to use props.onClick
const Button = ({ clicked, bigger, active, className, ...props }) => {
  const classArr = [classes.Button, className];

  if (bigger) {
    classArr.push(classes.Bigger);
  }

  if (active) {
    classArr.push(classes.Active);
  }

  return (
    <button className={classArr.join(' ')} onClick={clicked} {...props}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  clicked: PropTypes.func,
  bigger: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
