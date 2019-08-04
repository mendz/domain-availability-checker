import React from 'react';
import PropTypes from 'prop-types';

import classes from './ErrorMessage.module.css';

const ErrorMessage = ({ error, response, code }) => {
   // check if the error is about all the free uses for the month are finished
   let responseMessage = <p>Please try again later.</p>;
   if (code === 429) {
      responseMessage = (
         <p>
            {response}
         </p>
      );
   }

   return (
      <div className={classes.ErrorMessage}>
         <p>{error}</p>
         {responseMessage}
      </div>
   )
}

ErrorMessage.propTypes = {
   error: PropTypes.string.isRequired,
   response: PropTypes.string,
   code: PropTypes.number
}

export default ErrorMessage;
