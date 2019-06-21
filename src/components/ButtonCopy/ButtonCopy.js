import React from 'react';
import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';
import copySvg from '../../assets/icons/copy.svg';

import classes from './ButtonCopy.module.css';

const ButtonCopy = ({ children, copyText }) => {
   let text = null;
   if (children) {
      text = <span className={classes.Text}>{children}</span>;
   }

   const copy = textToCopy => {
      if (textToCopy) {
         navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
               // copy the string to the clipboard!
               console.log(`Copy: "${textToCopy}", to the clipboard!`);
            })
            .catch(() => console.error(`Failed to copy - '${textToCopy}' to the clipboard!`));
      }
   }
   return (
      <Button className={classes.ButtonCopy} clicked={() => copy(copyText)}>
         <img src={copySvg} alt="Copy link" />
         {text}
      </Button>
   )
}

ButtonCopy.propTypes = {
   copyText: PropTypes.string
}

export default ButtonCopy
