import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router'

import GuildHero from './GuildHero';
import GuildPet from './GuildPet';
import Loading from './Loading'

function mapStateToProps(store) {
  return { 
    guild: store.guilds.guild,
    guilds: store.guilds.guilds,
    heroes: store.guilds.guild && store.guilds.guild.heroes,
    pets: store.guilds.guild && store.guilds.guild.pets,
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
    
    const { guild, heroes, pets, guildFetched } = this.props;
    
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
    
    const Pets  = pets.map((pet)=>{
      return <GuildPet pet={pet} key={pet.pet_id._id} />
    });
    
    return (
      <div>

        <div className="row guild-info">
          <div className="col-md-1 text-center">
            <img src={require(`../../public/images/guilds/${guild.type.toLowerCase()}.png`)} className="img-responsive guild-name-icon guild-name-icon-xs" alt="logo" />
            
          </div>
          <div className="col-md-7 text-center-xs">
            <h2>
              {guild.name}
              <small className="hidden-xs"> {guild.description} </small>
            </h2>
          </div>
          <div className="col-md-2 text-right text-center-xs guild-info-top-pad">
            { guild.campaign && 
              <span><span className="glyphicon glyphicon-link"></span> {guild.campaign && guild.campaign.name}</span> }
            { guild.coin && 
              <img src={require(`../../public/images/item-card-price.png`)} className="img-responsive guild-has-coin" alt="coin" /> }
          </div>
          <div className="col-md-2 text-right guild-info-top-pad">
            <button className="btn btn-primary btn-block btn-lg" type="button" onClick={ () => this.toggleEditing() } >
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
              Edit
            </button>
          </div>
        </div>
        
        
        <div className="row">
          {Heroes}
        </div>
        
        <div className="row">
          {Pets}
        </div>
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(GuildView);