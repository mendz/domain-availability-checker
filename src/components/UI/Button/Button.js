import React from 'react'

import classes from './Button.module.css';

const Button = ({ clicked, ...props }) => (
   <button
      className={classes.Button}
      onClick={clicked}
      {...props}>{props.children}</button>
)

export default Button
