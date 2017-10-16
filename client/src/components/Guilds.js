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
  
  guildImage(name = "none", size = "32"){
    return <img src={require('../../public/images/guilds/'+ name.toLowerCase() +'.png')} className={`img-responsive icon icon-${size}`} alt="logo"/>
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
              {this.guildImage(guild.type, 48)}
              <span className="guild-name">{guild.name}</span>
              {guild.campaign && 
                <span className="glyphicon glyphicon-link pull-right"></span>
              }
            </td>
            <td>{guild.description}</td>
            <td>{dateFormat(guild.createdAt, "dd mmm yyyy")}</td>
            <td className="text-center">
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
              {this.guildImage(guild.type, 64)}
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
          
          :<table className="table table-striped table-bordered table-guilds">
            <thead>
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Created</td>
                <td className="col-md-1 text-center">View</td>
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