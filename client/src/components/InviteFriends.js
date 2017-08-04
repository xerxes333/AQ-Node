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
  };
}


class InviteFriends extends React.Component {

  handleSubmit = (values) => {
    this.props.dispatch( 
      inviteFriend(
        this.props.campaign._id, 
        {currentPlayers: this.props.players, invitePlayers: values.friends} 
    ));
  }
  
  filterFriends(){
    const friends = this.props.friends;
    const players = this.props.campaign.players;
    var unique = [];
    
    if(friends && players){
      unique = friends.filter(function(friend){
          return players.filter(function(player){
              return player._id === friend._id
          }).length === 0
      });
    }
    return unique;
  }

  render(){

    const { grid, pending, name } = this.props;
    const index = grid - 1;
    const filteredFriends = this.filterFriends();
    
    if(pending)
      return <div className="col-md-3 campaign-grid">
        <div className="campaign-generic">
          Waiting for <span className="text-primary">{name}</span> to add a guild
        </div>
      </div>
      
    if(!filteredFriends || !filteredFriends.length || filteredFriends.length <= index)
      return <div className="col-md-3 campaign-grid">
        <div className="campaign-generic">
          Awww, you don't have any available friends! Use the <span className="text-primary">Share Code</span> to invite other players.
        </div>
      </div>
      
    return (
      <div className="col-md-3 campaign-grid text-center">
        <InviteFriend friends={filteredFriends} index={index} onSubmit={this.handleSubmit} />
      </div>
    );
  };
  
}

export default connect(mapStateToProps)(InviteFriends);