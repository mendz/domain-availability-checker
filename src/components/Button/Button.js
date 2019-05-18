import React from 'react';
import PropTypes from 'prop-types';

import './Button.module.css';

const Button = props => (
   <button {...props}>{props.children}</button>
);

Button.propTypes = {
   onClick: PropTypes.func,
   disable: PropTypes.bool,
   type: PropTypes.string
}

export default Button;