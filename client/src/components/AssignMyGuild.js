import React from "react";
import { connect } from "react-redux";
import { addPlayerGuild } from '../actions/campaignActions'

import AvailableGuilds from './forms/AvailableGuilds';

function mapStateToProps(store) {
  return {
    campaign: store.campaigns.campaign,
    campaignFetching: store.campaigns.campaignFetching,
    campaignFetched: store.campaigns.campaignFetched,
    availableGuilds: store.guilds.guilds,
    guild: store.guilds.guild,
    guildFetched: store.guilds.guildFetched,
    user: store.user,
    form: store.form || {},
  };
}

class AssignMyGuild extends React.Component {

  handleSubmit = (values) => {
    
    if(!values.guild)
      return false
      
    const { index, campaign, user } = this.props

    this.props.dispatch( addPlayerGuild(user.user._id, values.guild, index, campaign) )
  }
  
  render(){
    
    const { availableGuilds, index } = this.props;
    const formName = `availableGuilds_${index}`
    
    if(!availableGuilds.length)
      return <div className="col-md-3 text-center assign-my-guild">
        <div className="campaign-generic campaign-grid">
          <h4>You have no free guilds available</h4>
          <a className="btn btn-success btn-block btn-lg" href="/guilds/new" role="button">Create Guild</a>
        </div>
      </div>
    
    return <div className="col-md-3 text-center assign-my-guild">
      <div className="campaign-generic campaign-grid">
        <AvailableGuilds guilds={availableGuilds} onSubmit={this.handleSubmit} form={formName} index={index} />
      </div>
    </div>
  };
  
}

// export default AssignMyGuild;
export default connect(mapStateToProps)(AssignMyGuild);