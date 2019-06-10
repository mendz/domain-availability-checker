import React from 'react';

import classes from './Textarea.module.css';

const Textarea = ({ change, value, ...props }) => (
   <textarea
      className={classes.Textarea}
      onChange={change}
      value={value}
      {...props} />
)

export default Textarea;
