export default function reducer(state={
    curses: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      
      case "FETCH_CURSES": {
        return {...state, fetching: true}
      }
      case "FETCH_CURSES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          curses: action.payload,
        }
      }
      
      case "FETCH_CURSE": {
        return {...state, fetching: true}
      }
      case "FETCH_CURSE_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          curses: action.payload,
        }
      }
      
      default:
        break;
      
    } // end switch

    return state
}