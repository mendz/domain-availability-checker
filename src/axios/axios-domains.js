import axios from 'axios';

console.log(process.env.NODE_ENV);

const getBase = () => {
   if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:1598/';
   }
   return 'https://domain-info-12547.herokuapp.com/';
}

const instance = axios.create({
   baseURL: getBase()
});

export default instance;