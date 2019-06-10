import React from 'react'

import classes from './Button.module.css';

const Button = ({ clicked, bigger, ...props }) => {
   const classArr = [classes.Button];

   if (bigger) {
      classArr.push(classes.Bigger);
   }

   return (
      <button
         className={classArr.join(' ')}
         onClick={clicked}
         {...props}>{props.children}</button>
   );
}

export default Button
