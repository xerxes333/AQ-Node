import React from "react";
import { Field } from 'redux-form';

class FriendDropdown extends React.Component {

  render(){
      const { friends, index } = this.props;
      
      const List = friends.map((friend, i)=>{
        return (
          <option value={friend._id} key={friend._id}> {friend.name}</option>
        );
      });
      
      return (
        <Field name={`friends[${index}]`} component="select" className="form-control input-fat">
          <option value="">-- Choose Friend --</option>
          {List}
        </Field>
      
      );  
  };
}

export default FriendDropdown;