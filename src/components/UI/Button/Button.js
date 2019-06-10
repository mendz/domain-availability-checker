import React from 'react'

import classes from './Button.module.css';

const Button = ({ clicked, smaller, ...props }) => {
   const classArr = [classes.Button];

   if (smaller) {
      classArr.push(classes.Smaller);
   }

   return (
      <button
         className={classArr.join(' ')}
         onClick={clicked}
         {...props}>{props.children}</button>
   );
}

export default Button
