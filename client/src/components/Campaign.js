import React from "react";
import { connect } from "react-redux";

import { fetchCampaigns, fetchCampaign, updateCampaign, deleteCampaign } from '../actions/campaignActions'
import { fetchGuilds } from '../actions/guildActions'

import CampaignLog from './forms/CampaignLog';
import CampaignLogSmall from './forms/CampaignLogSmall';
import Loading from './Loading'
import PrevNext from './PrevNext'
import CampaignPlayer from './CampaignPlayer'



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

class Campaign extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      grids: [],
      fours: [],
      MAX_PLAYERS: 4,
    };
  }
  
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
      
      if(players[i] && players[i] !== undefined){
        obj.creator = (players[i].player._id === campaign.created_by) ? true : false
        obj.player = players[i].player
        obj.guild = players[i].guild
      } else {
        obj.creator = false;
        obj.player = {};
        obj.guild = {}
      }
      
      Arr.push(obj)
        
    }
    
    return Arr;
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
    
    const {campaignFetched, campaignFetching, campaigns, campaign } = this.props
    
    if(campaignFetching || !campaignFetched)
      return <Loading title="Campaign"/>

    const Fours = this.populateFours()
    const Grids = Fours.map((four, index)=>{
      return <CampaignPlayer key={index} index={index} player={four} />
    })
    
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
          
            <ul className="nav nav-tabs aq-tabs" role="tablist">
              <li role="presentation" className="active"><a href="#log" aria-controls="log" role="tab" data-toggle="tab">Campaign Log</a></li>
              <li role="presentation" className=""><a href="#guilds" aria-controls="guilds" role="tab" data-toggle="tab">Guilds</a></li>
            </ul>
          
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="log">
                { (this.isSmall)? 
                  <CampaignLogSmall
                      onSubmit={this.handleSubmit.bind(this)} 
                      onDelete={this.handleDelete.bind(this)} />
                  : <CampaignLog 
                      onSubmit={this.handleSubmit.bind(this)} 
                      onDelete={this.handleDelete.bind(this)} />
                }
              </div>
              <div role="tabpanel" className="tab-pane" id="guilds">
                <div className="row">
                  {Fours && Grids}
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
        <PrevNext type="campaigns" all={campaigns} current={campaign}/>
        
      </div>
    );
    
  }
}

Campaign.defaultProps = {
  isSmall: false,
};

export default connect(mapStateToProps)(Campaign);