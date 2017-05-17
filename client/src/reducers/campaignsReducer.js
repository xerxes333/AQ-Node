export default function reducer(state={
    campaigns: [],
    campaign: [],
    fetching: false,
    fetched: false,
    campaignFetched: false,
    campaignFetching: false,
    updating: false,
    updated: false,
    error: null,
    editLogEntry: [],
  }, action) {

    switch (action.type) {
      case "FETCH_CAMPAIGNS": {
        return {
          ...state, 
          fetching: true,
          fetched: false,
        }
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
          campaignFetching: true,
          campaignFetched: false,
        }
      }
      case "FETCH_CAMPAIGN_FULFILLED": {
        return {
          ...state,
          campaignFetched: true,
          campaignFetching: false,
          campaign: action.payload,
        }
      }
      case "FETCH_CAMPAIGN_FAILURE": {
        return {
          ...state,
          campaignFetched: false,
          campaignFetching: false,
          campaign: [],
        }
      }
      
      case "CREATE_CAMPAIGN": {
        return {
          ...state,
        }
      }
      
      case "CREATE_CAMPAIGN_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          campaignFetched: true,
          campaign: action.payload.campaign,
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
          editLogEntry: [],
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
      
      /***** DELETE *****/
      
      case "DELETE_CAMPAIGN": {
        return {
          ...state,
          deleting: true,
          deleted: false,
          campaignFetching: false,
          campaignFetched: false,
        }
      }
      
      case "DELETE_CAMPAIGN_FULFILLED": {
        return {
          ...state,
          deleting: false,
          deleted: true,
          error: null,
          errorMessage: null,
          isEditing: false,
          campaign: [],
        }
      }
      
      case "DELETE_CAMPAIGN_FAILURE": {
        return {
          ...state,
          deleting: false,
          deleted: false,
          error: true,
          errorMessage: action.payload.message,
        }
      }
      
      case "EDIT_LOG_ENTRY": {
        return {
          ...state,
          editLogEntry: action.payload,
        }
      }
      
      default:
        break;
    }

    return state;
}