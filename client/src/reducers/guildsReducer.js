export default function reducer(state={
    guilds: [],
    error: null,
    isEditing: false,
    
    fetching: false,
    fetched: false,
    guildFetched: false,
    
    creating: false,
    created: false,
    
    updating: false,
    updated: false,
    
    deleting: false,
    deleted: false,
    
  }, action) {

    switch (action.type) {
      
      case "FETCH_GUILDS": {
        return {...state, fetching: true}
      }
      case "FETCH_GUILDS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          guilds: action.payload,
        }
      }
      case "FETCH_GUILDS_FAILURE": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          guildFetched: false,
          guilds: [],
        }
      }
      
      case "FETCH_GUILD": {
        return {
          ...state, 
          fetching: true,
          guildFetched: false,
          guild: {}
        }
      }
      case "FETCH_GUILD_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          guildFetched: true,
          guild: action.payload,
        }
      }
      case "FETCH_GUILD_FAILURE": {
        return {
          ...state,
          fetching: false,
          fetched: false,
          guildFetched: false,
          guild: {},
        }
      }
      
      case "CREATE_GUILD": {
        return {
          ...state,
          creating: action.payload,
        }
      }
      
      case "CREATE_GUILD_FULFILLED": {
        return {
          ...state,
          creating: false,
          created: true,
          guild: action.payload.guild,
          error: null,
          errorMessage: null,
        }
      }
      
      case "CREATE_GUILD_FAILURE": {
        return {
          ...state,
          creating: false,
          created: false,
          error: true,
          errorMessage: action.payload.message,
        }
      }
      
      case "EDIT_GUILD": {
        return {
          ...state,
          isEditing: action.payload,
        }
      }
      
      case "UPDATE_GUILD": {
        return {
          ...state,
          updating: true,
        }
      }
      
      case "UPDATE_GUILD_FULFILLED": {
        return {
          ...state,
          updating: false,
          updated: true,
          guild: action.payload.guild,
          error: null,
          errorMessage: null,
          isEditing: false,
        }
      }
      
      case "UPDATE_GUILD_FAILURE": {
        return {
          ...state,
          updating: false,
          updated: false,
          error: true,
          errorMessage: action.payload.message,
        }
      }
      
      
      /***** DELETE *****/
      
      case "DELETE_GUILD": {
        return {
          ...state,
          deleting: true,
        }
      }
      
      case "DELETE_GUILD_FULFILLED": {
        return {
          ...state,
          deleting: false,
          deleted: true,
          error: null,
          errorMessage: null,
          isEditing: false,
          guild: {},
        }
      }
      
      case "DELETE_GUILD_FAILURE": {
        return {
          ...state,
          deleting: false,
          deleted: false,
          error: true,
          errorMessage: action.payload.message,
        }
      }
      
      default:
        break;
      
    } // end switch

    return state
}