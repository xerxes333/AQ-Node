import React from "react";
import { Field } from 'redux-form';
import { Expansions } from '../../../CampaignData'

class ExpansionsDropdown extends React.Component {

  render(){
    
      const List = Expansions.map((expansion, index)=>{
        return (
          <option value={expansion} key={index}>{expansion}</option>
        )
      })
      
      return (
        <Field name="campaignExpansion" component="select" className="form-control">
          {List}
        </Field>
      
      );  
  };
}

export default ExpansionsDropdown