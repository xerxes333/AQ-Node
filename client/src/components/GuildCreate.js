import React from "react";
import { connect } from "react-redux";
import { browserHistory } from 'react-router';

import { createGuild } from '../actions/guildActions'
import GuildEdit from './forms/GuildEdit'

function mapStateToProps(store) {
  return {
    guild: store.guilds.guild,
    guildCreated: store.guilds.created,
    guildCreating: store.guilds.creating,
  };
}

class GuildCreate extends React.Component {
  
  
  componentDidUpdate(){
    const { guildCreated, guildCreating, guild } = this.props;
    
    if(guildCreated && !guildCreating)
      browserHistory.push(`/guilds/${guild._id}`);
  }
  
  handleSubmit(values) {
    this.props.dispatch(createGuild(values));
  }
  
  handleSuccess(values) {
    console.log(values, "======================SUCCESS")
  }
  
  handleFail(values) {
    console.log(values, "================FAIL")
  }
  
  render() {
    return <div>
        <h2>Create Guild</h2>
        <GuildEdit 
          id={this.props.params.id} 
          onSubmit={this.handleSubmit.bind(this)}
          onSubmitSuccess={this.handleSuccess.bind(this)}
          onSubmitFail={this.handleFail.bind(this)}
        />
      </div>
  }
}

export default connect(mapStateToProps)(GuildCreate);