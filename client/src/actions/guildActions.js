import { browserHistory } from 'react-router'; 
import Client from '../Client';

export function fetchGuilds(criteria = {}) {
    return function(dispatch) {
      dispatch({type: "FETCH_GUILDS"});
      Client.searchCriteria('guilds', criteria, (data) => {
          if(!data.success) {
              dispatch({ type: "FETCH_GUILDS_FAILURE", payload: data });
              dispatch({ type: "LOGIN_EXPIRED", payload: data });
          } else {
              dispatch({ type: "FETCH_GUILDS_FULFILLED", payload: data.guilds });    
          }
      });
    }
}

export function fetchGuild(id) {
    return function(dispatch) {
        dispatch({type: "FETCH_GUILD"});
        Client.search(`guilds/${id}`, (data) => {
            if(!data.success || data.guild === undefined) {
                dispatch({ type: "FETCH_GUILD_FAILURE", payload: data });
            } else {
                dispatch({ type: "FETCH_GUILD_FULFILLED", payload: data.guild })
                // setTimeout(() => {
                //     dispatch({ type: "FETCH_GUILD_FULFILLED", payload: data.guild })
                // }, 3000)
            }
        });
    }
}

function parseGuildData(data){
  
  const obj = {}
  if(data.guildName)
    obj.name = data.guildName
  if(data.guildDescription)
    obj.description = data.guildDescription
  if(data.guildAnimal)
    obj.type = data.guildAnimal
  if(data.guildCamapignCode)
    obj.code = data.guildCamapignCode
  if(data.campaign)
    obj.campaign = data.campaign
  if(data.guildCoin)
    obj.coin = data.guildCoin
  if(data.heroes)
    obj.heroes = data.heroes.filter((hero) => {
      return (hero && hero.id) ? hero : null
    })
    .map((hero) => {
      if(!hero.items)   // if hero has no items just set the hero id
        return {hero_id: hero.id}
      return {
        hero_id: hero.id,
        items: hero.items.filter((item)=>{
          return (item && item.id) ? item : null
        })
        .map((item) => {
          return item.id
        }),
        curses: hero.curses.filter((curse)=>{
          return (curse && curse.id) ? curse : null
        })
        .map((curse) => {
          return curse.id
        })
      }
    })
  
  return obj;
}

export function createGuild(data) {
    return function(dispatch) {
      const parsed = parseGuildData(data);
      dispatch({type: "CREATE_GUILD", payload: true});
      Client.post(`guilds/`, parsed, (payload) => {
        if(!payload.success) {
          dispatch({ type: "CREATE_GUILD_FAILURE", payload: payload });
        } else {
          dispatch({ type: "CREATE_GUILD_FULFILLED", payload: payload });
        }
      });
    }
}

export function updateGuild(id, data) {
    return function(dispatch) {
      const parsed = parseGuildData(data);
      dispatch({type: "UPDATE_GUILD"});
      Client.put(`guilds/${id}`, parsed, (payload) => {
        if(!payload.success) {
          dispatch({ type: "UPDATE_GUILD_FAILURE", payload: payload });
        } else {
          dispatch({ type: "UPDATE_GUILD_FULFILLED", payload: payload });
        }
      });
    }
}

export function deleteGuild(id) {
    return function(dispatch) {
        dispatch({type: "DELETE_GUILD"});
        Client.del(`guilds/${id}`, (data) => {
            if(!data.success) {
                dispatch({ type: "DELETE_GUILD_FAILURE", payload: data });
            } else {
                dispatch({ type: "DELETE_GUILD_FULFILLED" })
                browserHistory.push('/guilds');
            }
        });
    }
}
