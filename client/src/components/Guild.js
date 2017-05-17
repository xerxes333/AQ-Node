import React from "react";
import { connect } from "react-redux";

import { fetchGuild, updateGuild, deleteGuild } from '../actions/guildActions'
import GuildView from './GuildView'
import GuildEdit from './forms/GuildEdit'
import Breadcrumbs from './Breadcrumbs';

function mapStateToProps(store) {
  return { 
    guild: store.guilds.guild,
    guildFetched: store.guilds.guildFetched,
    isEditing: store.guilds.isEditing,
    isUpdating: store.guilds.updating,
    isUpdated: store.guilds.updated,
  };
}

class Guild extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchGuild(this.props.params.id));
  }
  
  componentWillUnmount(){
    this.props.dispatch({type: "EDIT_GUILD", payload: false})
  }
  
  handleSubmit(values) {
    this.props.dispatch(updateGuild(this.props.params.id, values));
  }
  
  handleSuccess(values) {
    console.log(values, "======================SUCCESS")
  }
  
  handleFail(values) {
    console.log(values, "================FAIL")
  }
  
  handleDelete(values) {
    if(confirm("Are you sure you want to delete this Guild? This process can not be undone."))
      this.props.dispatch(deleteGuild(this.props.params.id))
  }
  
  render() {
    
    if(this.props.isEditing)
      return <div>
        <Breadcrumbs />
        <GuildEdit 
          id={this.props.params.id} 
          onSubmit={this.handleSubmit.bind(this)}
          onSubmitSuccess={this.handleSuccess.bind(this)}
          onSubmitFail={this.handleFail.bind(this)}
          onDelete={this.handleDelete.bind(this)}
        />
      </div>
      
    else
      return <div>
        <Breadcrumbs />
        <GuildView />
      </div>
  }
}

export default connect(mapStateToProps)(Guild);