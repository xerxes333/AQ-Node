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
      dispatch({type: "CREATE_CAMPAIGN"});
      Client.post(`campaigns`, data, (data) => {
        if(!data.success) {
          dispatch({ type: "CREATE_CAMPAIGN_FAILURE", payload: data });
        } else {
          dispatch({ type: "CREATE_CAMPAIGN_FULFILLED", payload: data });    
          browserHistory.push(`/campaigns/${data.campaign._id}`);
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

export function addPlayerGuild(userID, guildId, currIndex, campaign) {
  
  const flatten = flattenCampaignPlayers(campaign.players)
  
  const newPlayers = flatten.map((player, i)=>{
    if(currIndex === i)
      return {player: userID, guild: guildId}
    return player
  })
  
  return updateCampaign( campaign._id, {players: newPlayers, addingGuild: true, guildID: guildId} )
}



export function inviteFriend(campaign, friend, grid) {
  
  var updatedPlayers = flattenCampaignPlayers(campaign.players)
  updatedPlayers[grid] = {player: friend}
  
  return updateCampaign(campaign._id, {players: updatedPlayers})
}



export function kickGuild(campaign, guild, grid) {
  
  var players = flattenCampaignPlayers(campaign.players)
  
  if(guild.user_id._id === campaign.created_by && grid === 0) // not allowed to kick the campaign creator
    players[grid] = {player: players[0].player}
  else
    players[grid] = null
  
  return updateCampaign(campaign._id,{players: players, kick: guild._id, playerID: guild.user_id._id})
  
}


export function leaveCampaign(guild) {
    
  const players = guild.campaign.players.map((player, index)=>{
    if(player && player.player === guild.user_id._id && player.guild === guild._id)
      return null
    return player
  })
  
  return updateCampaign(guild.campaign._id,{players: players})
}


export function deleteCampaign(id) {
    return function(dispatch) {
        dispatch({type: "DELETE_CAMPAIGN"});
        Client.del(`campaigns/${id}`, (data) => {
            if(!data.success) {
                dispatch({ type: "DELETE_CAMPAIGN_FAILURE", payload: data });
            } else {
                dispatch({ type: "DELETE_CAMPAIGN_FULFILLED" })
                browserHistory.push('/campaigns');
            }
        });
    }
}

function flattenCampaignPlayers(players){
  const flatten = players.map((player, i)=>{
    if(player && player.player){
      if(player.guild)
        return {player: player.player._id, guild: player.guild._id}
      return {player: player.player._id, guild: null}
    }
    return player
  })
  
  return flatten
}