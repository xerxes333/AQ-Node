import { browserHistory } from 'react-router'; // eslint-disable-next-line 
import dispatcher from "../dispatcher";
import Client from '../Client';
import { fetchUserProfile } from './userActions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


export function loginUser(creds) {
  
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.username}&password=${creds.password}`
  };
  
  return function(dispatch) {
    dispatch({type: LOGIN_REQUEST});
    Client.auth(config, (data) => {
      if(data.success){
        localStorage.setItem('token', data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        dispatch(fetchUserProfile());
        browserHistory.push('/');
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: data });
      }
      
    });
  }
  
}


export function logoutUser() {
  return function(dispatch) {
    dispatch({type: LOGOUT_REQUEST});
    dispatch({type: LOGOUT_SUCCESS, payload: {message: "You have been logged out."} });
    localStorage.removeItem('token')
    browserHistory.push('/login');
  }
}

