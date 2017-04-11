import { browserHistory } from 'react-router';
import Client from '../Client';

export function fetchCampaigns() {
  return function(dispatch) {
    dispatch({type: "FETCH_CAMPAIGNS"});
    Client.search('campaigns', (data) => {
      if(!data.success) {
        dispatch({ type: "FETCH_CAMPAIGNS_FAILURE", payload: data });
        dispatch({ type: "LOGIN_EXPIRED", payload: data });
      } else {
        dispatch({ type: "FETCH_CAMPAIGNS_FULFILLED", payload: data.campaigns });    
      }
    });
  }
}

export function fetchCampaign(id) {
    return function(dispatch) {
      dispatch({type: "FETCH_CAMPAIGN"});
      Client.search(`campaigns/${id}`, (data) => {
        if(!data.success) {
          dispatch({ type: "FETCH_CAMPAIGN_FAILURE", payload: data });
          dispatch({ type: "LOGIN_EXPIRED", payload: data });
        } else {
          dispatch({ type: "FETCH_CAMPAIGN_FULFILLED", payload: data.campaigns });    
        }
      });
    }
}

export function createCampaign(data) {
    return function(dispatch) {
      Client.post(`campaigns`, data, (data) => {
        if(!data.success) {
          dispatch({ type: "CREATE_CAMPAIGN_FAILURE", payload: data });
        } else {
          dispatch({ type: "CREATE_CAMPAIGN_FULFILLED", payload: data });    
          browserHistory.push('/campaigns');
        }
      });
    }
}

export function updateCampaign(id, data) {
    return function(dispatch) {
      dispatch({type: "UPDATE_CAMPAIGN"});
      Client.put(`campaigns/${id}`, data, (data) => {
        if(!data.success) {
          dispatch({ type: "UPDATE_CAMPAIGN_FAILURE", payload: data });
        } else {
          dispatch({ type: "UPDATE_CAMPAIGN_FULFILLED", payload: data });
        }
      });
    }
}

export function inviteFriend(id, data) {
  
  // get list of current players
  const currentPlayers = data.currentPlayers.map((player) => {
    return player._id
  })
    
  // remove any duplicates from invitees
  var uniqueFriends = data.invitePlayers.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
    
  //concat the two values
  const updatedPlayers = currentPlayers.concat(uniqueFriends)
  
  return updateCampaign(id,{players: updatedPlayers})
}

export function kickGuild(campaign, guild) {
  
  var players = campaign.players
  
  // if the kicked guild owner is NOT the campaign creator, remove from players
  if(guild.user_id._id !== campaign.created_by)
    players = campaign.players.filter((p, index)=>{
      return p._id !== campaign.created_by
    })

  // remove the guild from the campaign
  var guilds = campaign.guilds.filter((g, index, self)=>{
    return  g._id !== guild._id
  })
  
  return updateCampaign(campaign._id,{players: players, guilds: guilds, kick: guild._id})
  
}
