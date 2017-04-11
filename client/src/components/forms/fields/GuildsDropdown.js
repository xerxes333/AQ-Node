import React from "react";
import { Field } from 'redux-form';

class GuildsDropdown extends React.Component {
  
  render(){
      const guilds = this.props.guilds;
      
      const List = guilds.map((guild, index)=>{
        return (
          <option value={guild._id} key={guild._id}> {guild.name}</option>
        );
      });
      
      return (
        <Field name="guild" component="select" className="form-control" onChange={this.props.onChange}>
          <option value="">-- Choose Guild --</option>
          {List}
        </Field>
      
      );  
  };
}

export default GuildsDropdown;