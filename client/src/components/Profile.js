import React from "react";
import { connect } from "react-redux";

import ProfileView from './ProfileView'
import ProfileEdit from './ProfileEdit'

import { updateUser } from '../actions/userActions';

function mapStateToProps(store) {
  return { 
    user: store.user.user,
    userFetched: store.user.fetched,
    isEditing: store.user.isEditing,
  };
}
  
class Profile extends React.Component {
  
  handleSubmit(values) {
    this.props.dispatch( updateUser(this.props.user._id, values) );
  } 
  
  render() {
    
    // const isEditing = 0;
    const { isEditing } = this.props
    
    if(isEditing)
      return <ProfileEdit onSubmit={this.handleSubmit.bind(this)} />
      
    return <ProfileView />
    
  }
}

export default connect(mapStateToProps)(Profile);