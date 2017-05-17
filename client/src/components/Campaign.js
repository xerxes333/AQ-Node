import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router';

import { fetchCampaigns, fetchCampaign, updateCampaign, deleteCampaign } from '../actions/campaignActions'
import { fetchGuilds } from '../actions/guildActions'
import Breadcrumbs from './Breadcrumbs';

import AssignMyGuild from './AssignMyGuild'
import InviteFriends from './InviteFriends';
import CampaignGuild from './CampaignGuild';
import CampaignLog from './forms/CampaignLog';
import CampaignLogSmall from './forms/CampaignLogSmall';
import Loading from './Loading'



function mapStateToProps(store) {
  return { 
    campaigns: store.campaigns.campaigns,
    campaign: store.campaigns.campaign,
    campaignFetching: store.campaigns.campaignFetching,
    campaignFetched: store.campaigns.campaignFetched,
    availableGuilds: store.guilds.guilds,
    user: store.user,
    friends: store.user.user.friends || [],
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


class Campaign extends React.Component {
  
  componentWillMount() {
    if(this.props.campaigns.length === 0)
      this.props.dispatch(fetchCampaigns());
    this.props.dispatch(fetchCampaign(this.props.params.id));
    this.props.dispatch(fetchGuilds({available: true}));
  }
  
  
  componentWillReceiveProps(nextProps){
    if(this.props.params.id !== nextProps.params.id)
      this.props.dispatch(fetchCampaign(nextProps.params.id));
    
  }
  
  handleSubmit(values) {
    this.props.dispatch(updateCampaign(this.props.params.id, values));
  }
  
  handleDelete(values) {
    if(confirm("Are you sure you want to delete this Campaign? This process can not be undone."))
      this.props.dispatch(deleteCampaign(this.props.params.id))
  }
  
  populateFours(){
    
    const campaign = this.props.campaign
    const players = campaign.players
    var Arr = []
    const MAX_PLAYERS = 4
    
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
  
  getPlayerGuild(pid, guilds){
    if(guilds){
      for(var i = 0; i < guilds.length; i++)
        if(guilds[i].user_id._id === pid)
          return guilds[i]
    }
    return {}
  }

  render() {
    
    const {campaignFetched, campaignFetching, campaigns, campaign, friends, user } = this.props
    
    if(campaignFetching || !campaignFetched)
      return <Loading title="Campaign"/>
    
    
    if (campaigns.length > 0){
      
      const index = campaigns.findIndex((camp,i)=>{
        return camp._id === campaign._id
      })
      
      var prev = null
      var next = null
      
      if(index === -1)
        prev = next = null
      else if(index === 0)
        next = campaigns[index + 1]._id
      else if(index === campaigns.length - 1)
        prev = campaigns[index - 1]._id
      else {
        prev = campaigns[index - 1]._id
        next = campaigns[index + 1]._id
      }
      
    }
 
    const Fours = this.populateFours();
    const Grids = Fours.map((four, index)=>{
      
      // TODO: clean up this behemoth
      // This should probably be handled in a seperate Component 
      if((user.user._id === campaign.created_by)){
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
            return <div className="col-md-3" key={index}>
              <div className="campaign-generic">
                Waiting for players to join
              </div>
            </div>
      }
      
    }) // end of Grids
    
    // TODO: seperate each tab into its own component 
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
            <h4>Share Code: <span className="label label-primary"><samp>{campaign.code}</samp></span></h4>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-12">
          
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active"><a href="#log" aria-controls="log" role="tab" data-toggle="tab">Campaign Log</a></li>
              <li role="presentation"><a href="#guilds" aria-controls="guilds" role="tab" data-toggle="tab">Guilds</a></li>
            </ul>
          
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="log">
                { (window.innerWidth < 768)? 
                  <CampaignLogSmall
                    onSubmit={this.handleSubmit.bind(this)} 
                    onDelete={this.handleDelete.bind(this)}
                  />
                  : <CampaignLog 
                    onSubmit={this.handleSubmit.bind(this)} 
                    onDelete={this.handleDelete.bind(this)}
                  />
                }
              </div>
              <div role="tabpanel" className="tab-pane" id="guilds">
                <div className="row">{Fours && Grids}</div>
              </div>
            </div>
            
          </div>
        </div>
        
        { /*TODO: Move this to its own Component ??? */ }
        <nav aria-label="...">
          <ul className="pager">
          
            {prev && 
              <li className="previous">
                <Link to={`/campaigns/${prev}`}>
                  <span aria-hidden="true" className="glyphicon glyphicon-chevron-left"> </span> Prev
                </Link>
              </li> 
            }
            
            {next && 
              <li className="next">
                <Link to={`/campaigns/${next}`}>
                  Next <span aria-hidden="true" className="glyphicon glyphicon-chevron-right"></span>
                </Link>
              </li> 
            }
          </ul>
        </nav>
        
        
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Campaign);