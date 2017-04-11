import React from "react";
import { connect } from "react-redux";

import InviteFriend from './forms/InviteFriend';

function mapStateToProps(store) {
  return {
    form: store.form.inviteFriend || {},
    players: store.campaigns.campaign.players || [],
    guilds: store.campaigns.campaign.guilds || [],
  };
}


class InviteFriends extends React.Component {

  componentWillMount() {
    // this.props.dispatch(fetchGuilds({available: true}));
    // this.props.dispatch(fetchGuilds());
  }
  
  handleSubmit = (values) => {
    var clean = values.friends.filter((value, index, self) => {
      if(value !== undefined && self.indexOf(value) === index)
        return value
      return false
    });
    
    console.log(clean, " === TODO: Invite Friend");
  }
  
  invitePending() {
    const { players, guilds, grid } = this.props;
    const player = players[grid];
    
    if(players.length === 1 || players.length === guilds.length || player === undefined)
      return false
    else if(guilds.length === 0)
      return true
    else {
      for(var i = 0; i < guilds.length; i++){
        if(guilds[i].user_id._id === player._id)
          return false
      }
      return true
    }
      
    
  }
  
  render(){
    const { friends, grid, players, pending, name } = this.props;
    const index = grid - 1;
    
    if(pending)
      return <div className="col-md-3 text-center"><h3> Invite Pending for {name} </h3></div>
      
    return (
      <div className="col-md-3 text-center">
        <InviteFriend friends={friends} index={index} onSubmit={this.handleSubmit} />
      </div>
    );
  };
  
}

export default connect(mapStateToProps)(InviteFriends);