import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = ({ clicked, bigger, className, ...props }) => {
   const classArr = [classes.Button, className];

   if (bigger) {
      classArr.push(classes.Bigger);
   }

   return (
      <button
         className={classArr.join(' ')}
         onClick={clicked}
         {...props}>{props.children}</button>
   );
};

Button.propTypes = {
   clicked: PropTypes.func,
   bigger: PropTypes.bool,
   className: PropTypes.string,
}

export default Button
