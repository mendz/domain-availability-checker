import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
   return class extends Component {
      state = {
         error: null,
      };

      componentWillMount() {
         console.log('[WithErrorHandler]:: componentDidMount');

         this.reqInterceptor = axios.interceptors.request.use(req => {
            // clean the error when calling a new request
            this.setState({ error: null });
            return req;
         });
         console.log('reqInterceptor:', this.reqInterceptor)

         // save the error in any response
         this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({ error });
         });
         console.log('resInterceptor:', this.resInterceptor)
      }

      componentWillUnmount() {
         console.log('[WithErrorHandler]:: componentWillUnmount');
         axios.interceptors.request.eject(this.reqInterceptor);
         axios.interceptors.request.eject(this.resInterceptor);
      }

      errorConfirmedHandler = () => {
         this.setState({ error: null });
      }

      render() {
         console.log('state: ', this.state);
         return (
            <>
               {/*  <Modal
                  show={this.state.error ? true : false}
                  closed={this.errorConfirmedHandler}>
                  {this.state.error ? this.state.error.message : null}
               </Modal> */}
               <WrappedComponent {...this.props} />
            </>
         )
      }
   }
}

export default WithErrorHandler
