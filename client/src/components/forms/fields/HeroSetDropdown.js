import React from "react";
// import { Field } from 'redux-form';
import { HeroSets } from '../../../CampaignData'

class HeroSetDropdown extends React.Component {

  render(){
    
      const List = HeroSets.map((obj, index)=>{
        return (
          <option value={obj.abrv} key={index}>{obj.name}</option>
        )
      })
      
      return (
        <select className="form-control input-fat" onChange={this.props.handleChange} >
          <option value="">-- Hero Set --</option>
          {List}
        </select>
      
      );  
  };
}

export default HeroSetDropdown