import React from "react";
// import Client from '../Client';
import { Link } from 'react-router';
import CampaignStore from '../stores/CampaignStore';
import * as CampaignActions from '../actions/CampaignActions'

export default class Campaigns extends React.Component {
  
  constructor() {
    super();
    this.state = {
      campaigns: CampaignStore.getAll()
    };
  }
  
  componentWillMount() {
    CampaignStore.on("change", this.getCampaigns);
  }
  
  componentWillUnmount() {
    CampaignStore.removeListener("change", this.getCampaigns);
  }
  
  componentDidMount() {
    CampaignActions.loadCampaigns();
  }
  
  getCampaigns() {
    this.setState({
      campaigns: CampaignStore.getAll()
    });
  }
  
  render() {
    
    const { campaigns } = this.state;
    const CampaignRows = campaigns.map((campaign)=>{
      return <tr key={campaign._id}>
        <td>{campaign.name}</td>
        <td>{campaign.description}</td>
        <td>{campaign.createdAt}</td>
        <td>
          <Link to={`/campaigns/${campaign._id}`}>
            <span className="glyphicon glyphicon-search"></span>
          </Link>
        </td>
      </tr>
    });
    
    return (
      <div>
        <h2>Campaigns</h2> 
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
            {CampaignRows}
          </tbody>
        </table>
      </div>
    );
    
  }
}