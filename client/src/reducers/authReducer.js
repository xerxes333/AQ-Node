export default function reducer(state={
    auth: [],
    fetching: false,
    fetched: false,
    error: null,
    errorMessage: null,
    isAuthenticated: checkAuth(localStorage.getItem('token'))
  }, action) {

  const LOGIN_REQUEST = 'LOGIN_REQUEST';
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  const LOGIN_FAILURE = 'LOGIN_FAILURE';
  const LOGIN_EXPIRED = 'LOGIN_EXPIRED';
  
  const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
  const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

  switch (action.type) {
    
    case LOGIN_REQUEST: {
      return {
        ...state, 
        fetching: true,
        error: null,
        errorMessage: null,
      }
    }
    
    case LOGIN_SUCCESS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isAuthenticated: true,
        auth: action.payload,
        error: null,
        errorMessage: null,
      }
    }
    
    case LOGIN_FAILURE: {
      return {
        ...state,
        fetching: false,
        fetched: false,
        isAuthenticated: false,
        error: action.payload.message,
        errorMessage: action.payload.message,
      }
    }
    
    case LOGIN_EXPIRED: {
      return {
        ...state,
        error: action.payload.message,
        errorMessage: action.payload.message,
        isAuthenticated: false,
      }
    }
    
    case LOGOUT_REQUEST:{
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }
    
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isAuthenticated: false,
        errorMessage: action.payload.message,
        auth: [],
      }
    }
    
    default:
      break;
    
  } // end switch

  return state;
}

/*
 * Not sure if this is how (or where) I should be doing this ?
 */
function checkAuth(token){
  if(!token) return false;
  var claim = JSON.parse(atob(token.split('.')[1]));
  if( !!token && (claim.exp > Date.now()/1000) )
    return true;
  else
    return false;
}
