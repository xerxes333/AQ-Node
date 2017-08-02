import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

import campaigns from "./campaignsReducer";
import guilds from "./guildsReducer";
import heroes from "./heroesReducer";
import curses from "./cursesReducer";
import items from "./itemsReducer";
import auth from "./authReducer";
import user from "./userReducer";

const appReducer = combineReducers({
  campaigns,
  guilds,
  heroes,
  items,
  curses,
  auth,
  user,
  form: formReducer,
})

const rootReducer = (state, action) => {
  
  if (action.type === 'LOGOUT_SUCCESS')
    state = undefined
  return appReducer(state, action)
  
}

export default rootReducer