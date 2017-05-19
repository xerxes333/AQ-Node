import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router'

import GuildHero from './GuildHero';
import Loading from './Loading'

function mapStateToProps(store) {
  return { 
    guild: store.guilds.guild,
    guilds: store.guilds.guilds,
    heroes: store.guilds.guild && store.guilds.guild.heroes,
    guildFetched: store.guilds.guildFetched,
    isEditing: store.guilds.isEditing
  };
}

class GuildView extends React.Component {
  
  componentWillMount() {
    // this.props.dispatch(fetchGuild(this.props.params.id));
  }
  
  toggleEditing() {
    this.props.dispatch({type: "EDIT_GUILD", payload: !this.props.isEditing})
  }
  
  render() {
    
    const { guild, heroes, guildFetched } = this.props;
    
    if(!guild)
      return <div>
        <h2>Guild</h2>
        <div className="alert alert-danger" role="alert">
          The requested Guild does not exist. 
          Please <Link to="/guilds" className="alert-link">click here </Link> to return to your Guilds.
        </div>
      </div>
    
    if( !guildFetched || !Object.keys(guild).length ){
      return <Loading title="Guild"/>
    }
    
    const Heroes = heroes.map((hero)=>{
      return <GuildHero hero={hero} key={hero.hero_id._id} />
    });
    
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <h2>
              <img src={require(`../../public/images/guilds/${guild.type.toLowerCase()}.png`)} className="img-responsive guild-name-icon" alt="logo" />
              {guild.name}
              <small> {guild.description} </small>
              <button type="button" className="btn btn-primary" onClick={() => this.toggleEditing() } >Edit</button>
              {guild.campaign && 
                <span className="pull-right small">
                  <span className="glyphicon glyphicon-link"></span>
                  {guild.campaign.name}
                </span>
              }
            </h2>
          </div>
        </div>
        
        <div className="row">
          {Heroes}
        </div>
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(GuildView);