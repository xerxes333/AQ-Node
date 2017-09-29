import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

function mapStateToProps(store) {
  return { 
    user: store.user.user,
    userFetched: store.user.fetched,
    isEditing: store.user.isEditing,
  };
}

const validate = values => {
  
  const errors = {}
  
  if(values.userName !== undefined && !values.userName)
    errors.userName = "Required"
  else if(!/[-A-Z]+$/i.test(values.userName))
    errors.userName = "Only letters and dash are allowed"
    
  if( (values.userPassword || values.userConfirm)
    && (values.userPassword !== values.userConfirm) )
      errors.userConfirm = "Passwords do not match"
  
  return errors
  
}

const renderField = ({ input, label, type, name, meta: { touched, error, warning } }) => (
  <div className={ "form-group  form-group-fat" + ( (touched && error)? "has-error" : "" ) }>
    <label htmlFor={name} className="col-md-2 control-label">{label}</label>
    <div className="col-md-5">
      <input {...input} type={type} name={name} className="form-control"/>
      {(touched && error) && <span className="help-block">{error}</span>}
    </div>
  </div>
)

class ProfileEdit extends React.Component {
  
  componentWillMount() {
      this.initializeForm()
  }
  
  initializeForm(){
    const user = this.props.user
    this.props.initialize({
      userName: user.name,
    });
    
  }
  
  cancel() {
    this.props.dispatch({type: "EDIT_USER", payload: {isEditing: false}})
  }
  
  render() {
    
    const { handleSubmit, user } = this.props;
    
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>  
      
        <h2>Edit Profile</h2>
        
        <Field name="userName" label="Name" component={renderField} type="text" />
        
        <div className="form-group">
          <label htmlFor="userEmail" className="col-md-2 control-label">Email</label>
          <div className="col-md-5">
            <h4>{user.email}</h4>
          </div>
        </div>
        
        <Field name="userPassword" label="Password" component={renderField} type="password" />
        <Field name="userConfirm" label="Confirm" component={renderField} type="password" />

        <div className="form-group">
          <div className="col-md-offset-2 col-md-10 profile-edit-buttons">
            <button type="submit" className="btn btn-primary btn-lg">Save</button>
            <button type="button" className="btn btn-warning btn-lg" onClick={ () => this.cancel() } >Cancel</button>
          </div>
        </div>
        
      </form>
    
    );
    
  }
}

ProfileEdit = reduxForm({
  form: 'editProfile',
  validate
})(ProfileEdit);

export default connect(mapStateToProps)(ProfileEdit);