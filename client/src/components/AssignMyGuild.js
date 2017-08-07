import React from "react";
import { connect } from "react-redux";
import { updateCampaign, fetchCampaign } from '../actions/campaignActions'
import { updateGuild } from '../actions/guildActions'

import AvailableGuilds from './forms/AvailableGuilds';
import CampaignGuild from './CampaignGuild';

function mapStateToProps(store) {
  return {
    campaign: store.campaigns.campaign,
    availableGuilds: store.guilds.guilds,
    guild: store.guilds.guild,
    guildFetched: store.guilds.guildFetched,
    form: store.form.availableGuilds || {},
  };
}

class AssignMyGuild extends React.Component {

  componentWillMount() {
  }
  
  handleSubmit = (values) => {
    
    if(!values.guild)
      return false;
      
    this.props.dispatch( updateCampaign(this.props.campaign._id, {guilds: this.props.campaign.guilds.concat(values.guild)} ) );
    this.props.dispatch( updateGuild(values.guild, {campaign:  this.props.campaign._id} ) );
    this.props.dispatch( fetchCampaign(this.props.campaign._id) );
    
  }
  
  render(){
    const { availableGuilds, guild, guildFetched, form } = this.props;
    const foo = (guildFetched && form.values !== undefined) ? <CampaignGuild guild={guild} isPreview="1" /> : null ;
    
    if(!availableGuilds.length)
      return <div className="col-md-3 text-center assign-my-guild">
        <br />
        <h4>You have no free guilds available</h4>
        <a className="btn btn-success btn-block" href="/guilds/new" role="button">Create Guild</a>
      </div>
      
    return <div className="col-md-3 text-center assign-my-guild">
        <AvailableGuilds guilds={availableGuilds} onSubmit={this.handleSubmit} />
        {foo}
      </div>
  };
  
}

// export default AssignMyGuild;
export default connect(mapStateToProps)(AssignMyGuild);