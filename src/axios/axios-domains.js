import axios from 'axios';

export const DEV_API = 'http://localhost:1598/';
export const PROD_API = 'https://domain-info-12547.herokuapp.com/';

const getBase = () => {
   if (process.env.NODE_ENV === 'development') {
      return DEV_API;
   }
   return PROD_API;
}

const instance = axios.create({
   baseURL: getBase()
});

export default instance;