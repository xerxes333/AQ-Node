import React from "react";
import { connect } from "react-redux";

import { fetchGuild, fetchGuilds, updateGuild, deleteGuild } from '../actions/guildActions'
import GuildView from './GuildView'
import GuildEdit from './forms/GuildEdit'
import PrevNext from './PrevNext'
import Loading from './Loading'

function mapStateToProps(store) {
  return { 
    G: store.guilds,
    guild: store.guilds.guild,
    guilds: store.guilds.guilds,
    guildFetched: store.guilds.guildFetched,
    isEditing: store.guilds.isEditing,
    isUpdating: store.guilds.updating,
    isUpdated: store.guilds.updated,
  };
}

class Guild extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchGuild(this.props.params.id));
    if(this.props.guilds.length === 0)
      this.props.dispatch(fetchGuilds());
  }
  
  componentWillUnmount(){
    this.props.dispatch({type: "EDIT_GUILD", payload: false})
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.params.id !== nextProps.params.id){
      this.props.dispatch({type: "EDIT_GUILD", payload: false})
      this.props.dispatch(fetchGuild(nextProps.params.id));
    }
  }

  handleSubmit(values, dispatch) {
    console.log(values, "======================SUBMIT")
    this.props.dispatch( updateGuild(this.props.params.id, values) )
    
    // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    // return sleep(3000).then(() => {
    //   console.log(values, "======================SUBMIT")
    //   this.props.dispatch( updateGuild(this.props.params.id, values) )
    // })
  }
  
  handleSuccess(values, dispatch) {
    console.log([values, dispatch], "======================SUCCESS")
  }
  
  handleFail(values, dispatch) {
    console.log([this, dispatch], "================FAIL")
  }
  
  handleDelete(values) {
    if(confirm("Are you sure you want to delete this Guild? This process can not be undone."))
      this.props.dispatch(deleteGuild(this.props.params.id))
  }
  
  render() {
    
    if(!this.props.guildFetched)
      return <Loading title="Guilds"/>
    
    if(this.props.isEditing)
      return <div>
        <GuildEdit 
          id={this.props.params.id} 
          onSubmit={this.handleSubmit.bind(this)}
          onSubmitSuccess={this.handleSuccess.bind(this)}
          onSubmitFail={this.handleFail.bind(this)}
          onDelete={this.handleDelete.bind(this)}
        />
        <PrevNext type="guilds" all={this.props.guilds} current={this.props.guild}/>
      </div>
      
    else
      return <div>
        <GuildView />
        <PrevNext type="guilds" all={this.props.guilds} current={this.props.guild}/>
      </div>
  }
}

export default connect(mapStateToProps)(Guild);