export default function reducer(state={
    items: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      
      case "FETCH_ITEMS": {
        return {...state, fetching: true}
      }
      case "FETCH_ITEMS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          items: action.payload,
        }
      }
      
      case "FETCH_ITEM": {
        return {...state, fetching: true}
      }
      case "FETCH_ITEM_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          items: action.payload,
        }
      }
      
      default:
        break;
      
    } // end switch

    return state
}