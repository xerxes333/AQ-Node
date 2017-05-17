import Client from '../Client';
import { loginUser } from './authActions';

export const FETCH_USER           = 'FETCH_USER'
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED'
export const FETCH_USER_FAILURE   = 'FETCH_USER_FAILURE'

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'

export function fetchUser(id) {
    return function(dispatch) {
      dispatch({type: "FETCH_CAMPAIGNS"});
      Client.search(`campaigns/${id}`, (data) => {
        if(!data.success) {
          dispatch({ type: "FETCH_CAMPAIGN_FAILURE", payload: data });
          dispatch({ type: "LOGIN_EXPIRED", payload: data });
        } else {
          dispatch({ type: "FETCH_CAMPAIGN_FULFILLED", payload: data.campaigns });    
        }
      });
    }
}

export function fetchUserProfile() {
  return function(dispatch) {
    dispatch({type: "FETCH_USER"});
    Client.search(`users/profile`, (data) => {
      if(!data.success) {
        dispatch({ type: "FETCH_USER_FAILURE", payload: data });
        dispatch({ type: "LOGIN_EXPIRED", payload: data });
      } else {
        dispatch({ type: "FETCH_USER_FULFILLED", payload: data.user });    
      }
    });
  }
}

export function createUser(creds) {

  return function(dispatch) {
    
    const MIN_PASSWORD_LENGTH = 8
    
    // required
    if(!creds.username || !creds.name || !creds.password || !creds.confirm)
      return  dispatch({ type: CREATE_USER_FAILURE, payload: {message: "All fields are required"} })
      
    // validate email
    if(creds.username && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(creds.username))
      return dispatch({ type: CREATE_USER_FAILURE, payload: {message: "Email invalid"} })
      
    // validate name
    if(!/[-A-Z]+$/i.test(creds.name))
      return dispatch({ type: CREATE_USER_FAILURE, payload: {message: "Name: Only letters and dash are allowed"} })
      
    // validate password
    if(creds.password !== creds.confirm)
      return  dispatch({ type: CREATE_USER_FAILURE, payload: {message: "Passwords do not match"} })
    if(creds.password.length < MIN_PASSWORD_LENGTH)
      return  dispatch({ type: CREATE_USER_FAILURE, payload: {message: "Password must be at least 8 characters long"} })
      
    creds.email = creds.username
    
    dispatch({type: CREATE_USER_REQUEST});
    
    Client.post(`users`, creds, (data) => {
      if(!data.success) {
        
        if(data.errmsg)
          data.message = (data.errmsg.includes("duplicate key error")) ? "User already exists." : data.errmsg
        
        dispatch({ type: CREATE_USER_FAILURE, payload: data });
        
      } else {
        dispatch({ type: CREATE_USER_SUCCESS, payload: data.user });    
        dispatch(loginUser(creds));
      }
    });

  }
    
}


function parseUserData(data){
  
  const obj = {}
  
  if(data.userName)
    obj.name = data.userName
  if( data.userPassword && (data.userPassword === data.userConfirm) )
    obj.password = data.userPassword
  if(data.friendEmail)
    obj.friendEmail = data.friendEmail
  
  return obj;
}

export function updateUser(id, data) {
    return function(dispatch) {
      const parsed = parseUserData(data);
      dispatch({type: "UPDATE_USER"});
      Client.put(`users/${id}`, parsed, (payload) => {
        if(!payload.success) {
          dispatch({ type: "UPDATE_USER_FAILURE", payload: payload });
        } else {
          dispatch({ type: "UPDATE_USER_FULFILLED", payload: payload });
        }
      });
    }
}


export function addFriend(id, data) {
    return function(dispatch) {
      const parsed = {friendEmail: data.friendEmail};
      dispatch({type: "UPDATE_USER"});
      Client.put(`users/${id}`, parsed, (payload) => {
        if(!payload.success) {
          dispatch({ type: "ADD_FRIEND_FAILURE", payload: payload });
        } else {
          dispatch({ type: "ADD_FRIEND_FULFILLED", payload: payload });
        }
      });
    }
}