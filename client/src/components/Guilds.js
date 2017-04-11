import React from "react";
import { Link } from 'react-router';
import { connect } from "react-redux";

import { fetchGuilds } from '../actions/guildActions';
import Loading from './Loading'

function mapStateToProps(store) {
  return { 
    guilds: store.guilds.guilds,
    guildsFetched: store.guilds.fetched,
    isCreating: store.guilds.creating,
  };
}

class Guilds extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchGuilds());
  }
  
  render() {
    
    const { guilds, guildsFetched } = this.props
    
    if(!guildsFetched)
      return <Loading title="Guilds"/>
    
    const GuildRows = (!guilds.length)? 
      <tr><td colSpan="4">No Guilds</td></tr> : 
      this.props.guilds.map((guild)=>{
        return (
          <tr key={guild._id}>
            <td>
              <img src={require('../../public/images/guilds/'+ guild.type.toLowerCase() +'.png')} className="img-responsive guild-name-icon-32" alt="logo"/>
              {guild.name}
              {guild.campaign && 
                <span className="glyphicon glyphicon-link pull-right"></span>
              }
            </td>
            <td>{guild.description}</td>
            <td>{guild.createdAt}</td>
            <td>
              <Link to={`/guilds/${guild._id}`}>
                <span className="glyphicon glyphicon-search"></span>
              </Link>
            </td>
          </tr>
        )
      })
    
    return (
      <div>
        
        <h2>
          Guilds
          <Link to={`/guilds/new`} className="btn btn-primary new-guild">
            <span className="glyphicon glyphicon-plus-sign" style={{paddingRight: "10px"}}></span>
            New
          </Link>
        </h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Created</td>
                <td>View</td>
              </tr>
            </thead>
            <tbody>
              {GuildRows}
            </tbody>
          </table>
        </div>
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Guilds);