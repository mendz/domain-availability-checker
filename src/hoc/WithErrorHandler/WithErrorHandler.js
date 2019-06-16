import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const WithErrorHandler = (WrappedComponent, axios) => {
   return class extends Component {
      state = {
         error: null,
      };

      componentDidMount() {
         this.reqInterceptor = axios.interceptors.request.use(req => {
            // clean the error when calling a new request
            this.setState({ error: null });
            return req;
         });

         // save the error in any response
         this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({ error });
         });
      }

      componentWillUnmount() {
         axios.interceptors.request.eject(this.reqInterceptor);
         axios.interceptors.response.eject(this.resInterceptor);
      }

      errorConfirmedHandler = () => {
         this.setState({ error: null });
      }

      render() {
         return (
            <>
               <Modal
                  show={this.state.error ? true : false}
                  closed={this.errorConfirmedHandler}>
                  {this.state.error ? <ErrorMessage error={this.state.error.message}/> : null}
               </Modal>
               <WrappedComponent {...this.props} />
            </>
         )
      }
   }
}

export default WithErrorHandler
