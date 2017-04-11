import React from "react";
import { connect } from "react-redux";

import { createCampaign } from '../actions/campaignActions'
// import GuildHero from './GuildHero';
import CampaignCreateForm from './forms/CampaignCreate';

function mapStateToProps(store) {
  return { 
    user: store.user,
    friends: store.user.user.friends || [],
  };
}

class CampaignCreate extends React.Component {
  
  componentWillMount() {
    // this.props.dispatch(fetchGuild(this.props.params.id));
    // load user friends
  }
  

  
  handleSubmit(values) {
    const data = { 
      name: values.campaignName.trim(), 
      description: values.campaignName.trim(),
      players: values.friends
    }
    
    this.props.dispatch(createCampaign(data));
  }
  
  render() {
    
    const errorMessage = null;
    const { friends } = this.props
    
    return (
      <div className="row">
          <div className="col-md-4 col-md-offset-4">
              <h2>Create New Campaign</h2>
              
               <CampaignCreateForm
                onSubmit={this.handleSubmit.bind(this)} 
                friendsFetched={friends && friends.length}
                friends={friends} />
              
              {errorMessage &&
                <p style={{color:'red'}}>{errorMessage}</p>
              }
          </div>
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(CampaignCreate);