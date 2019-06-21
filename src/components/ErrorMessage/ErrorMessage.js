import React from 'react'

import classes from './ErrorMessage.module.css';

const ErrorMessage = ({ error }) => {
   // check if the error is Billing when all the free uses for the month are finished
   let billingMsg = null;
   if (/^billing$/i.test(error.trim())) {
      billingMsg = (
         <>
            <p>
               Unfortunately, all of the free uses had been used. <span role="img" aria-label="sad-face">😢</span>
            </p>
         </>
      );
   }

   return (
      <div className={classes.ErrorMessage}>
         <p>{error}</p>
         {billingMsg}
         <br />
         <p>Please try again later.</p>
      </div>
   )
}

export default ErrorMessage
