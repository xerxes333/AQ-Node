export default function reducer(state={
    heroes: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      
      case "FETCH_HEROES": {
        return {...state, fetching: true}
      }
      case "FETCH_HEROES_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          heroes: action.payload,
        }
      }
      
      case "FETCH_HERO": {
        return {...state, fetching: true}
      }
      case "FETCH_HERO_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          hero: action.payload,
        }
      }
      
      default:
        break;
      
    } // end switch

    return state
}