import React from "react";
import { connect } from "react-redux";

import CampaignHero from './CampaignHero';
import CampaignPet from './CampaignPet';
import { kickGuild } from '../actions/campaignActions'
import { fetchGuilds } from '../actions/guildActions'

function mapStateToProps(store) {
  return { 
    user: store.user.user,
    campaign: store.campaigns.campaign,
  };
}

class CampaignGuild extends React.Component {
  
  kick(){
    
    const { guild, campaign } = this.props;
    
    if(confirm("Are you sure you want to remove this guild from the campaign?")){
      this.props.dispatch( kickGuild(campaign, guild) )
      this.props.dispatch(fetchGuilds({available: true}));
    }
      
  }
  
  render(){
      const { guild, user, campaign, isPreview } = this.props;
      
      if(!guild)
        return <div>Loading...</div>;
    
      const guildClasses = `campaign-guild campaign-guild-${guild.type}`;
      
      const HeroRows = guild.heroes.map((hero)=>{
        return <CampaignHero hero={hero} key={hero.hero_id._id} />
      });
      
      const PetRows = guild.pets.map((pet)=>{
        return <CampaignPet pet={pet} key={pet.pet_id._id} />
      });
      
      return (
        <div className={guildClasses} key={guild._id}>
          <div className="row">
            <div className="col-xs-3">
              <img src={require(`../../public/images/guilds/${guild.type.toLowerCase()}.png`)} className="img-responsive guild-name-icon guild-name-icon-64" alt="logo" />
            </div>
            <div className="col-xs-9">
              <div className="campaign-guild-name">{guild.name}</div>
              <div className="campaign-guild-user">{guild.user_id.name}</div>
            </div>
          </div>
          {HeroRows}
          {PetRows}
          {(user._id === campaign.created_by) && !isPreview && 
            <button type="button" className="btn btn-danger btn-block btn-lg" onClick={ () => this.kick() }>{(guild.user_id._id === user._id)? "Leave" : "Kick"}</button>
          }
          
        </div>
      );  
  };
}

export default connect(mapStateToProps)(CampaignGuild);