import axios from 'axios';
 import {serverError } from './JWTAuthProvider'
import { be } from 'date-fns/locale';
// import JWTAuthAuthProvider from './JWTAuthProvider';

const jwtAxios = axios?.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }

    if(!err.response && err.request){

  //  return Promise.reject({response: { data: {message: "Network Error: Unable to connect to server."}}});
   return Promise.reject({message: "Network Error: Unable to connect to server."});
      
    }

    return Promise.reject(err);
  },
);


export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
