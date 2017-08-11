export default function reducer(state={
    pets: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      
      case "FETCH_PETS": {
        return {...state, fetching: true}
      }
      case "FETCH_PETS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          pets: action.payload,
        }
      }
      
      case "FETCH_PET": {
        return {...state, fetching: true}
      }
      case "FETCH_PET_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          pet: action.payload,
        }
      }
      
      default:
        break;
      
    } // end switch

    return state
}