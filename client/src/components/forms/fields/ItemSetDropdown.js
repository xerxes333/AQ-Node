import React from "react";
// import { Field } from 'redux-form';
import { ItemSets } from '../../../CampaignData'

class ItemSetDropdown extends React.Component {

  render(){
    
      const List = ItemSets.map((obj, index)=>{
        return (
          <option value={obj.set} key={index}>{obj.name}</option>
        )
      })
      
      return (
        <select className="form-control" onChange={this.props.handleChange} >
          <option value="">-- Item Set --</option>
          {List}
        </select>
      
      );  
  };
}

export default ItemSetDropdown