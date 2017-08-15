import React from "react";
import { connect } from "react-redux";

import { createCampaign } from '../actions/campaignActions'
import { getLog } from '../CampaignData'
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
      description: (values.campaignDescription)? values.campaignDescription.trim() : null,
      expansion: values.campaignExpansion,
      players: values.friends,
      log: getLog(values.campaignExpansion)
    }
    
    this.props.dispatch(createCampaign(data));
  }
  
  render() {
    
    const errorMessage = null;
    const { friends } = this.props
    
    return (
      <div className="row">
          <div className="col-md-4 col-md-offset-4">
              <h2>Create Campaign</h2>
              
               <CampaignCreateForm
                onSubmit={this.handleSubmit.bind(this)} 
                friendsFetched={friends && friends.length}
                friends={friends} />
              
              {errorMessage &&
                <p className="text-danger">{errorMessage}</p>
              }
          </div>
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(CampaignCreate);