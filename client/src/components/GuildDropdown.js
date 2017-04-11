import React from "react";
// import { Field } from 'redux-form';

class GuildDropdown extends React.Component {

  render(){
      const guilds = this.props.guilds;
      
      const List = guilds.map((guild, index)=>{
        return (
          <option value={guild._id} key={guild._id}> {guild.name}</option>
        );
      });
      
      return (
        <select name="guild" className="form-control">
          <option value=""> -- Select Guild --</option>
          {List}
        </select>
      );  
  };
}

export default GuildDropdown;