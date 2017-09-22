import React from "react";
import { connect } from "react-redux";

import CampaignGuild from './CampaignGuild';
import AssignMyGuild from './AssignMyGuild';
import InviteFriends from './InviteFriends';

function mapStateToProps(store) {
  return { 
    campaign: store.campaigns.campaign,
    user: store.user,
  }
}

class CampaignPlayer extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      addMyGuild:   false,
      inviteFriend: false,
    }
  }
  
  inviteFriend(){
    this.setState((prevState) => {
      return {inviteFriend: !prevState.inviteFriend}
    })
  }
  
  addMyGuild(){
    this.setState((prevState) => {
      return {addMyGuild: !prevState.addMyGuild}
    })
  }
  
  render(){
    
    const { player, user, campaign, index } = this.props
    
    if(player.guild && player.guild._id)
      return <div className="col-md-3 text-center">
        <CampaignGuild guild={player.guild} key={index} grid={index} />
      </div>
      
    if(player.player._id && user.user._id === player.player._id)
        return <AssignMyGuild key={index} index={index} />
        
    if(player.player._id)
      return <InviteFriends name={player.player.name} key={index} pending={true} grid={index} />
      
    if(this.state.inviteFriend)
      return <InviteFriends name={player.player.name} key={index} grid={index} />
    
    if(this.state.addMyGuild)
      return <AssignMyGuild key={index} index={index} />
      
    if((user.user._id === campaign.created_by))
      return <div className="col-md-3" key={index}>
        <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={ () => {this.addMyGuild()} } >Add My Guild</button>
        <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={ () => {this.inviteFriend()} } >Invite Friend</button>
      </div>
    
    else
      return <div className="col-md-3" key={index}>
        <div className="campaign-generic">
          Waiting for players to join
        </div>
      </div>
  }
  
}

export default connect(mapStateToProps)(CampaignPlayer)