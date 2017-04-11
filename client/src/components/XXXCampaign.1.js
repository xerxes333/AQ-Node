import React from "react";
import { connect } from "react-redux";

import { fetchCampaign } from '../actions/campaignActions'
import { fetchGuilds } from '../actions/guildActions'
import CampaignGuildBlock from './CampaignGuildBlock';

import AssignMyGuild from './AssignMyGuild'

function isUserGuildAssigned(campaign){
  
  if(campaign.guilds){
    const guilds = campaign.guilds;
    for(var i = 0; i < guilds.length; i++){
      if(guilds[i].user_id._id === campaign.created_by)
        return true
    }  
  }
  return false;
}

function getPlayerGuild(pid, guilds){
  if(guilds){
    for(var i = 0; i < guilds.length; i++)
      if(guilds[i].user_id._id === pid)
        return guilds[i]._id
  }
  return null
}

function mapStateToProps(store) {
  return { 
    campaign: store.campaigns.campaign,
    campaignFetched: store.campaigns.campaignFetched,
    availableGuilds: store.guilds.guilds,
    isAssigned: isUserGuildAssigned(store.campaigns.campaign),
    
    // this is just hard coded for now since users dont have frends 
    // TODO: we should only show friends who have not already been invited
    friendsFetched: true,
    friends: [
      {_id: '001', name: 'Robert'},
      {_id: '002', name: 'Shawn'},
      {_id: '003', name: 'Christo'},
      {_id: '004', name: 'Nick'},
      {_id: '005', name: 'Pete'},
    ],
    
    players: store.campaigns.campaign.players || [],
  };
}

class Campaign extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCampaign(this.props.params.id));
    // this.props.dispatch(fetchGuilds({available: true}));
    this.props.dispatch(fetchGuilds());
  }

  render() {
    
    if(!this.props.campaignFetched){
      return <div>Loading...</div>;
    }
    
    const campaign = this.props.campaign;
    const guilds = campaign.guilds || [];
    const players = campaign.players || [];
    
    
    /**************************************************/
    /**************************************************/
    var Grids = [];
    const MAX_PLAYERS = 4;
    for(var i = 0; i < MAX_PLAYERS; i++){
      var obj = {};
      
      if(players[i] !== undefined){
        obj.creator = (players[i]._id === campaign.created_by) ? true : false ;
        obj.player_id = players[i]._id;
        obj.guild_id = getPlayerGuild(obj.player_id, guilds)
      } else {
        obj.creator = false;
        obj.player_id = null
        obj.guild_id = null
      }
      
      Grids.push(obj)
        
    }
    
    const Foo = Grids.map((player, index)=>{
      if(player.creator && !player.guild_id)
        return <AssignMyGuild />
      if(player.player_id && !player.guild_id)
        return `<InvitePending>`
      if(!player.guild_id)
        return `<InviteFriend>`
      return `<CampaignGuild>`
    });
    
    console.log(Grids, "=============== GRIDS");
    console.log(Foo, "=============== FOO");
    /**************************************************/
    /**************************************************/
    
    
    
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>
              <img src={require('../../public/images/logo-arcadia-quest.png')} className="img-responsive guild-name-icon" alt="logo"/>
              {campaign.name} 
              <small> {campaign.description} </small>
            </h2>
            Share Code: {campaign.code}
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-3 text-center">
            <CampaignGuildBlock guild={guilds[0]} grid="0" isAssigned={this.props.isAssigned} availableGuilds={this.props.availableGuilds}/>
          </div>
          <div className="col-md-3 text-center">
            <CampaignGuildBlock guild={guilds[1]} grid="1" friends={this.props.friends} />
          </div>
          <div className="col-md-3 text-center">
            <CampaignGuildBlock guild={guilds[2]} grid="2" friends={this.props.friends} />
          </div>
          <div className="col-md-3 text-center">
            <CampaignGuildBlock guild={guilds[3]} grid="3" friends={this.props.friends} />
          </div>
          
        </div>
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Campaign);