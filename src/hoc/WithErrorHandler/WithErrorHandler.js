import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useHttpErrorHandler from '../../hooks/http-error-handlers';

const withErrorHandler = (WrappedComponent, axios) => {
   return props => {
      const [error, clearError] = useHttpErrorHandler(axios);
      return (
         <>
            <Modal
               show={error ? true : false}
               closed={clearError}>
               {error ? <ErrorMessage error={error.message} /> : null}
            </Modal>
            <WrappedComponent {...props} />
         </>
      )
   }
};

export default withErrorHandler
