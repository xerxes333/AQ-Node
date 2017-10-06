import React from "react";
import { Link, browserHistory  } from 'react-router';
import { connect } from "react-redux";
var dateFormat = require('dateformat');

import { fetchCampaigns } from '../actions/campaignActions';
import Loading from './Loading'
import SectionHeader from './SectionHeader'

function mapStateToProps(store) {
  return { 
    campaigns: store.campaigns.campaigns,
    campaignsFetched: store.campaigns.fetched
  };
}

class Campaigns extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchCampaigns());
  }
  
  rowClicked(id){
    browserHistory.push(`/campaigns/${id}`);
  }
  
  expansionLabel(exp = "Core", pull = ""){
    
    const obj = {
      "Core":             "core",
      "Beyond The Grave": "btg",
      "Inferno":          "inferno",
      "Pets":             "pets",
    }
    
    
    
    return <span className={`label label-${obj[exp]} ${pull}`}>
    {(exp === "Beyond The Grave") ? "BTG" : exp}
    </span>
  }
  
  logoImage(exp = "Core", size = "32"){
    
    const obj = {
      "Core":             "core",
      "Beyond The Grave": "btg",
      "Inferno":          "inferno",
      "Pets":             "pets",
    }
    return <img src={require(`../../public/images/aq-logo-${obj[exp]}.png`)} className={`img-responsive icon icon-${size}`} alt="logo"/>
  }
  
  render() {
    
    const { campaignsFetched, campaigns } = this.props
    
    if(!campaignsFetched)
     return <Loading title="Campaigns"/>
    
  
    const CampaignRows = (!campaigns.length)? 
      <tr><td colSpan="5">No Campaigns</td></tr> : 
      campaigns.map((campaign)=>{
        return <tr key={campaign._id}>
          <td>
            {this.logoImage(campaign.expansion, 48)}
            {campaign.name}
          </td>
          <td>{this.expansionLabel(campaign.expansion)}</td>
          <td>{campaign.description}</td>
          <td>{dateFormat(campaign.createdAt, "dd mmm yyyy")}</td>
          <td>
            <Link to={`/campaigns/${campaign._id}`}>
              <span className="glyphicon glyphicon-search"></span>
            </Link>
          </td>
        </tr>
      });
      
      const CampaignRowsSmall = (!campaigns.length)? 
      <tr><td colSpan="5">No Campaigns</td></tr> : 
      campaigns.map((campaign)=>{
        return <tr key={campaign._id} onClick={() => this.rowClicked(campaign._id)}>
          <td>
            {this.logoImage(campaign.expansion, 64)}
            {campaign.name}
            {this.expansionLabel(campaign.expansion, "pull-right")}
          </td>
        </tr>
      });
     
    return (
      <div>
       
       <SectionHeader name="Campaigns" create={true} filter={false} />
       
       <div className="row"> 
        <div className="col-md-12"> 
          { (window.innerWidth < 768)? 
            <table className="table table-striped table-bordered campaigns-small">
              <tbody>
                {CampaignRowsSmall}
              </tbody>
            </table>
            
            :<table className="table table-striped table-bordered table-campaigns">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Expansion</td>
                  <td>Description</td>
                  <td>Created</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                {CampaignRows}
              </tbody>
            </table>
          }
        </div>
      </div>
        
        
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Campaigns);