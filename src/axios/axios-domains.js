import axios from 'axios';

const instance = axios.create({
   // baseURL: 'https://domain-info-12547.herokuapp.com/'
   baseURL: 'http://localhost:1598/'
});

export default instance;