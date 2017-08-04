import React from "react";
import { connect } from "react-redux";

import CampaignHero from './CampaignHero';
import { kickGuild } from '../actions/campaignActions'

function mapStateToProps(store) {
  return { 
    user: store.user.user,
    campaign: store.campaigns.campaign,
  };
}

class CampaignGuild extends React.Component {
  
  kick(){
    
    const { guild, campaign } = this.props;
    
    if(confirm("Are you sure you want to remove this guild from the campaign?"))
      this.props.dispatch( kickGuild(campaign, guild) );
      
  }
  
  render(){
      const { guild, user, campaign, isPreview } = this.props;
      
      if(!guild)
        return <div>Loading...</div>;
    
      const guildClasses = `campaign-guild campaign-guild-${guild.type}`;
      
      const HeroRows = guild.heroes.map((hero)=>{
        return <CampaignHero hero={hero} key={hero.hero_id._id} />
      });
      
      return (
        <div className={guildClasses} key={guild._id}>
          <div className="row">
            <div className="col-md-3">
              <img src={require(`../../public/images/guilds/${guild.type.toLowerCase()}.png`)} className="img-responsive guild-name-icon guild-name-icon-64" alt="logo" />
            </div>
            <div className="col-md-9">
              <div className="campaign-guild-name">{guild.name}</div>
              <div className="campaign-guild-user">{guild.user_id.name}</div>
            </div>
          </div>
          {HeroRows}
          {(user._id === campaign.created_by) && !isPreview && 
            <button type="button" className="btn btn-danger" onClick={ () => this.kick() }>Kick</button>
          }
          
        </div>
      );  
  };
}

export default connect(mapStateToProps)(CampaignGuild);