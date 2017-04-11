export default function reducer(state={
    campaigns: [],
    campaign: [],
    fetching: false,
    fetched: false,
    campaignFetched: false,
    updating: false,
    updated: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_CAMPAIGNS": {
        return {...state, fetching: true}
      }
      case "FETCH_CAMPAIGNS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          campaigns: action.payload,
        }
      }
      case "FETCH_CAMPAIGNS_FAILURE": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          campaignFetched: false,
          campaigns: [],
        }
      }
      
      case "FETCH_CAMPAIGN": {
        return {
          ...state, 
          fetching: true,
          fetched: false,
          campaignFetched: false,
        }
      }
      case "FETCH_CAMPAIGN_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          campaignFetched: true,
          campaign: action.payload,
        }
      }
      case "FETCH_CAMPAIGN_FAILURE": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          campaignFetched: false,
          campaign: [],
        }
      }
      
      case "CREATE_CAMPAIGN_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          campaignFetched: true,
          campaign: action.payload,
        }
      }
      
      case "CREATE_CAMPAIGN_FAILURE": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          campaignFetched: false,
          campaign: [],
        }
      }
      
      case "UPDATE_CAMPAIGN": {
        return {
          ...state,
          updating: true,
        }
      }
      
      case "UPDATE_CAMPAIGN_FULFILLED": {
        return {
          ...state,
          updating: false,
          updated: true,
          error: null,
          errorMessage: null,
          campaign: action.payload.campaign,
        }
      }
      
      case "UPDATE_CAMPAIGN_FAILURE": {
        return {
          ...state,
          updating: false,
          updated: false,
          error: true,
          errorMessage: action.payload.message,
        }
      }
      
      default:
        break;
    }

    return state;
}