export default function reducer(state={
    user: [],
    fetching: false,
    fetched: false,
    creating: false,
    created: false,
    updating: false,
    updated: false,
    error: false,
    errorMessage: null,
  }, action) {
    
    const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
    const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
    const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'
    
    const UPDATE_USER           = 'UPDATE_USER'
    const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED'
    const UPDATE_USER_FAILURE   = 'UPDATE_USER_FAILURE'
    
    const ADD_FRIEND            = 'ADD_FRIEND'
    const ADD_FRIEND_CLEAR      = 'ADD_FRIEND_CLEAR'
    const ADD_FRIEND_FULFILLED  = 'ADD_FRIEND_FULFILLED'
    const ADD_FRIEND_FAILURE    = 'ADD_FRIEND_FAILURE'
    
    const EDIT_USER = 'EDIT_USER'

    switch (action.type) {
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      
      case "FETCH_USER_FAILURE": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          user: [],
        }
      }
      
      case CREATE_USER_REQUEST: {
        return {
          ...state,
          creating: true,
          created: false,
          user: [],
        }
      }
      
      case CREATE_USER_SUCCESS: {
        return {
          ...state,
          creating: false,
          created: true,
          user: action.payload.user,
        }
      }
      
      case CREATE_USER_FAILURE: {
        return {
          ...state,
          creating: false,
          created: false,
          user: [],
          error: true,
          errorMessage: action.payload.message,
        }
      }
      
      case EDIT_USER: {
        return {
          ...state,
          isEditing: action.payload.isEditing,
        }
      }
      
      case UPDATE_USER: {
        return {
          ...state,
          updating: true,
          updated: false,
        }
      }
      
      case UPDATE_USER_FULFILLED: {
        return {
          ...state,
          fetching: false,
          fetched: true,
          updating: false,
          updated: true,
          user: action.payload.user,
          isEditing: false,
        }
      }
      
      case UPDATE_USER_FAILURE: {
        return {
          ...state,
          updating: false,
          updated: false,
          user: [],
          error: true,
          errorMessage: action.payload.message,
          isEditing: false,
        }
      }
     
      case ADD_FRIEND: {
        return {
          ...state,
          updating: true,
          updated: false,
        }
      }
      
      case ADD_FRIEND_CLEAR: {
        return {
          ...state,
          updating: false,
          updated: false,
          error: false,
          errorMessage: null,
        }
      }
      
      case ADD_FRIEND_FULFILLED: {
        return {
          ...state,
          updating: false,
          updated: true,
          user: action.payload.user,
          error: false,
          errorMessage: null,
        }
      }
      
      case ADD_FRIEND_FAILURE: {
        return {
          ...state,
          updating: false,
          updated: false,
          user: action.payload.user,
          error: true,
          errorMessage: action.payload.message,
        }
      }
      
      default:
        break;
    }

    return state
}