import React from "react";
import { connect } from "react-redux";
import { reset, SubmissionError  } from 'redux-form'
var dateFormat = require('dateformat');

import { fetchUserProfile, addFriend } from '../actions/userActions';
import Loading from './Loading'
import AddFriend from './forms/AddFriend'

function mapStateToProps(store) {
  return { 
    user: store.user.user,
    userFetched: store.user.fetched,
    isEditing: store.user.isEditing,
    updated: store.user.updated,
  };
}

class ProfileView extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchUserProfile());
  }
  
  componentWillUnmount(){
    this.props.dispatch( {type: "ADD_FRIEND_CLEAR"} )
  }
  
  toggleEditing() {
    this.props.dispatch({type: "EDIT_USER", payload: {isEditing: !this.props.isEditing}})
  }
  
  handleAddFriend(values) {
    if(!values.friendEmail)
      throw new SubmissionError({ friendEmail: 'Required', _error: 'Add friend failed' })
    else
      this.props.dispatch( addFriend(this.props.user._id, values) );
      
    this.props.dispatch( reset('addFriend') );
  }
  
  render() {
    
    const { user, userFetched } = this.props;
    
    if(!userFetched)
     return <Loading title="Profile"/>
    
    
    
    const created = new Date(user.createdAt)
    const joined = dateFormat(created, "mmm yyyy");
    
    const friendsList = user.friends.map((friend, index)=>{
      return <tr key={friend._id}><td>{friend.name}</td></tr>
    })
     
    return (
      <div className="row">
        <div className="col-md-12">
        
          <h2>
            {user.name}
            <small> ({user.email}) </small>
            <button type="button" className="btn btn-primary" onClick={() => this.toggleEditing() } >Edit</button>
          </h2> 
          
          Joined: {joined}
          <hr/>
          
          <h2>Friends</h2>
          
          <div className="row">
            <div className="col-md-4">
              
              <AddFriend onSubmit={this.handleAddFriend.bind(this)} />
              
              { user.friends.length > 0 && 
                <table className="table table-condensed table-bordered table-striped">
                  <tbody>{friendsList}</tbody>
                </table>
              }
              
            </div>
          </div>
          
        </div>
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(ProfileView);