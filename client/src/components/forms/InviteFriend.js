import React from 'react'
import { connect } from "react-redux";
import { reduxForm } from 'redux-form'
import FriendDropdown from './fields/FriendDropdown'

function mapStateToProps(store) {
  return {
    
  };
}

class InviteFriend extends React.Component {
  
  
  
  render(){
    const { handleSubmit, friends, index } = this.props;
    return (
      <form onSubmit={handleSubmit} >
      
        <div className="form-group">
          <label htmlFor={`friends[${index}]`} > Invite your Friend! </label>
          <FriendDropdown friends={friends} index={index}/>
        </div>
        <button type="submit" className="btn btn-primary" >Invite</button>
        
      </form>
    );
  }
}

InviteFriend = reduxForm({
  form: 'inviteFriend'
})(InviteFriend);

export default connect(mapStateToProps)(InviteFriend);
