import React from "react";
import { Field } from 'redux-form';

class FriendDropdown extends React.Component {

  render(){
      const friends = this.props.friends;
      const i = this.props.index + 1;
      
      const List = friends.map((friend, index)=>{
        return (
          <option value={friend._id} key={friend._id}> {friend.name}</option>
        );
      });
      
      return (
        <div className="form-group">
          <label htmlFor={`friends[${i}]`} >Friend {i}</label>
          <Field name={`friends[${i}]`} component="select" className="form-control">
            <option value="">-- Choose Friend --</option>
            {List}
          </Field>
        </div>
      
      );  
  };
}

export default FriendDropdown;