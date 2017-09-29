import React from "react";
import { Field } from 'redux-form';

class PlayersDropdown extends React.Component {

  render(){
      const { players, name } = this.props
      
      const List = players.map((player, index)=>{
        return (
          <option value={player._id} key={player._id}> {player.name}</option>
        )
      })
      
      return (
        <Field name={name} component="select" className="form-control input-fat">
          <option value=""></option>
          {List}
        </Field>
      
      );  
  };
}

export default PlayersDropdown