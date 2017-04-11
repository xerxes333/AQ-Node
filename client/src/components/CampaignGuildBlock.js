import React from "react";
import { connect } from "react-redux";

import AssignMyGuild from './AssignMyGuild'
import InviteFriends from './InviteFriends';
import CampaignGuild from './CampaignGuild';

function mapStateToProps(store) {
  return {
    guildSelected: store.guilds.guildFetched,
    myGuild: store.guilds.guild,
  };
}

class CampaignGuildBlock extends React.Component {

  render(){
      const { isAssigned, guild, friends, grid } = this.props;
      
      // RETHINK
      
      if(isAssigned !== undefined && !isAssigned)
        return <AssignMyGuild />
      
      if(!guild) 
        return <InviteFriends friends={friends} grid={grid} />
      
      return <CampaignGuild guild={guild} />;
  }
}

export default connect(mapStateToProps)(CampaignGuildBlock);