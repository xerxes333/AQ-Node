import React from "react";
import { connect } from "react-redux";
import { inviteFriend } from '../actions/campaignActions'
import InviteFriend from './forms/InviteFriend';

function mapStateToProps(store) {
  return {
    campaign: store.campaigns.campaign,
    form: store.form.inviteFriend || {},
    players: store.campaigns.campaign.players || [],
    guilds: store.campaigns.campaign.guilds || [],
    friends: store.user.user.friends || [],
  };
}


class InviteFriends extends React.Component {

  handleSubmit = (values) => {
    const { campaign, grid } = this.props
    this.props.dispatch( inviteFriend(campaign, values.friends[grid-1], grid) )
  }

  render(){

    const { grid, pending, name, friends } = this.props
    
    if(pending)
      return <div className="col-md-3 campaign-grid">
        <div className="campaign-generic">
          Waiting for <span className="text-primary">{name}</span> to add a guild
        </div>
      </div>
      
    if(!friends)
      return <div className="col-md-3 campaign-grid">
        <div className="campaign-generic">
          Awww, you don't have any available friends! Use the <span className="text-primary">Share Code</span> to invite other players.
        </div>
      </div>
      
    return (
      <div className="col-md-3 campaign-grid text-center">
        <div className="campaign-generic">
          <InviteFriend friends={friends} index={grid-1} onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  };
  
}

export default connect(mapStateToProps)(InviteFriends);