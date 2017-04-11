import React from "react";
import { connect } from "react-redux";

import { fetchCampaign } from '../actions/campaignActions'
import { fetchGuilds } from '../actions/guildActions'
// import CampaignGuildBlock from './CampaignGuildBlock';
// import { fetchUserProfile } from '../actions/userActions';
import Breadcrumbs from './Breadcrumbs';

import AssignMyGuild from './AssignMyGuild'
import InviteFriends from './InviteFriends';
import CampaignGuild from './CampaignGuild';
import Loading from './Loading'



function mapStateToProps(store) {
  return { 
    campaigns: store.campaigns.campaigns,
    campaign: store.campaigns.campaign,
    campaignFetching: store.campaigns.fetching,
    campaignFetched: store.campaigns.campaignFetched,
    availableGuilds: store.guilds.guilds,
    user: store.user,
    friends: store.user.user.friends || [],
    isOwner: (store.user.user._id === store.campaigns.campaign.created_by)? true : false,
  };
}


function getPlayerGuild(pid, guilds){
  if(guilds){
    for(var i = 0; i < guilds.length; i++)
      if(guilds[i].user_id._id === pid)
        return guilds[i]
  }
  return {}
}

function populateFours(players, campaign){
  var Arr = [];
  const MAX_PLAYERS = 4;
  
  for(var i = 0; i < MAX_PLAYERS; i++){
    var obj = {};
    
    if(players[i] !== undefined){
      obj.creator = (players[i]._id === campaign.created_by) ? true : false ;
      obj.player = players[i];
      obj.guild = getPlayerGuild(players[i]._id, campaign.guilds)
    } else {
      obj.creator = false;
      obj.player = {};
      obj.guild = {}
    }
    
    Arr.push(obj)
      
  }
  return Arr;
}

class Campaign extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCampaign(this.props.params.id));
    this.props.dispatch(fetchGuilds({available: true}));
  }

  render() {
    
    const {campaignFetched, fetching, campaign, friends, isOwner, user } = this.props
    
    if(!campaignFetched || fetching)
      return <Loading title="Campaign"/>
    
    const Fours = populateFours(campaign.players, campaign);
    
    const Grids = Fours.map((four, index)=>{
      
      // TODO: clean up this behemoth
      // This should probably be handled in a seperate Component 
      if(isOwner){
        if(four.creator && !four.guild._id)
          return <AssignMyGuild key={index} />
        if(four.player._id && !four.guild._id)
          return <InviteFriends pending={true} name={four.player.name} key={index} />
        if(!four.guild._id)
          return <InviteFriends friends={friends} grid={index} key={index} />
        else
          return <div className="col-md-3 text-center" key={index}>
            <CampaignGuild guild={four.guild} key={index} />
          </div>
      } else {
        if(four.guild._id)
          return <div className="col-md-3 text-center" key={index}>
            <CampaignGuild guild={four.guild} key={index} />
          </div>
        else
          if(four.player._id)
            if(four.player._id === user.user._id )
              return <AssignMyGuild key={index} />
            else
              return <InviteFriends pending={true} name={four.player.name} key={index} />
          else
            return <div className="col-md-3">
              <div className="campaign-generic">
                Waiting for players to join
              </div>
            </div>
      }
      
    }) // end of Grids
    
    
    return (
      <div>
      
        <Breadcrumbs path={"/campaigns/" + campaign.name}  />
        
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
          {Fours && Grids}
        </div>
        
        { /*TODO: fix links to point to pre/next campaigns */ }
        <nav aria-label="...">
          <ul className="pager">
            <li className="previous"><a href={"/campaigns/" + campaign._id}><span aria-hidden="true">&larr;</span> Prev</a></li>
            <li className="next"><a href={"/campaigns/" + campaign._id}>Next <span aria-hidden="true">&rarr;</span></a></li>
          </ul>
        </nav>
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Campaign);