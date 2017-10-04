import React from "react";
import { Link, browserHistory } from 'react-router';
import { connect } from "react-redux";
var dateFormat = require('dateformat');

import { fetchGuilds } from '../actions/guildActions';
import Loading from './Loading'
import SectionHeader from './SectionHeader'

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
  
  rowClicked(id){
    browserHistory.push(`/guilds/${id}`);
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
              <img src={require('../../public/images/guilds/'+ guild.type.toLowerCase() +'.png')} className="img-responsive icon icon-32" alt="logo"/>
              {guild.name}
              {guild.campaign && 
                <span className="glyphicon glyphicon-link pull-right"></span>
              }
            </td>
            <td>{guild.description}</td>
            <td>{dateFormat(guild.createdAt, "dd mmm yyyy")}</td>
            <td>
              <Link to={`/guilds/${guild._id}`}>
                <span className="glyphicon glyphicon-search"></span>
              </Link>
            </td>
          </tr>
        )
      })
      
    const GuildRowsSmall = (!guilds.length)? 
      <tr><td colSpan="4">No Guilds</td></tr> : 
      this.props.guilds.map((guild)=>{
        return (
          <tr key={guild._id} onClick={() => this.rowClicked(guild._id)} >
            <td>
              <img src={require('../../public/images/guilds/'+ guild.type.toLowerCase() +'.png')} className="img-responsive icon icon-48" alt="logo"/>
              {guild.name}
              {guild.campaign && 
                <span className="glyphicon glyphicon-link pull-right"></span>
              }
            </td>
          </tr>
        )
      })
    
    return (
      <div>
        
        <SectionHeader name="Guilds" create={true} filter={false} />
        
        { (window.innerWidth < 768)? 
          <table className="table table-striped table-bordered guilds-small">
            <tbody>
              {GuildRowsSmall}
            </tbody>
          </table>
          
          :<table className="table table-striped table-bordered">
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
        }
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Guilds);