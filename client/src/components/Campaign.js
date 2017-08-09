import React from "react";
import { connect } from "react-redux";

import { fetchCampaigns, fetchCampaign, updateCampaign, deleteCampaign } from '../actions/campaignActions'
import { fetchGuilds } from '../actions/guildActions'

import AssignMyGuild from './AssignMyGuild'
import InviteFriends from './InviteFriends';
import CampaignGuild from './CampaignGuild';
import CampaignLog from './forms/CampaignLog';
import CampaignLogSmall from './forms/CampaignLogSmall';
import Loading from './Loading'
import PrevNext from './PrevNext'



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
    this.isSmall = window.innerWidth < 768
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
  
  logoImage(exp = "Core", size = "32"){
    
    const obj = {
      "Core":             "core",
      "Beyond The Grave": "btg",
      "Inferno":          "inferno",
      "Pets":             "pets",
    }
    return <img src={require(`../../public/images/aq-logo-${obj[exp]}.png`)} className={`img-responsive guild-name-icon guild-name-icon-${size}`} alt="logo"/>
  }

  render() {
    
    const {campaignFetched, campaignFetching, campaigns, campaign, friends, user } = this.props
    
    if(campaignFetching || !campaignFetched)
      return <Loading title="Campaign"/>

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
        
        <div className="row header-row">
          <div className="col-md-12">
        
            <div className="row">
              <div className="col-md-1 text-center">
                {this.logoImage(campaign.expansion, (this.isSmall)? 128 : 64)}
              </div>
              <div className="col-md-9 text-center-xs">
                <h2>
                  {campaign.name}
                  <small className="hidden-xs"> {campaign.description} </small>
                </h2>
              </div>
              <div className="col-md-2 text-center">
                <h4>Share Code:</h4>
                <span className="label label-primary label-share-code"><samp>{campaign.code}</samp></span>
              </div>
            </div>
        
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
                { (this.isSmall)? 
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
        
        <PrevNext type="campaign" all={campaigns} current={campaign}/>
        
      </div>
    );
    
  }
}

Campaign.defaultProps = {
  isSmall: false,
};

export default connect(mapStateToProps)(Campaign);