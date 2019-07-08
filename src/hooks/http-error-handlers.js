import { useState, useEffect } from 'react';

const HttpErrorHandler = httpClient => {
   const [error, setError] = useState(null);

   // componentDidMount
   useEffect(() => {
      const reqInterceptor = httpClient.interceptors.request.use(req => {
         // clean the error when calling a new request
         setError(null);
         return req;
      });

      // save the error in any response
      const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
         setError(error);
      });

      // componentWillUnmount
      return () => {
         httpClient.interceptors.request.eject(reqInterceptor);
         httpClient.interceptors.response.eject(resInterceptor);
      }
   }, [httpClient.interceptors.request, httpClient.interceptors.response]);

   const errorConfirmedHandler = () => {
      setError(null);
   }

   return [error, errorConfirmedHandler];
};

export default HttpErrorHandler;