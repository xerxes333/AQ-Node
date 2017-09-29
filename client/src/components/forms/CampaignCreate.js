import React from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form';
import FriendDropdown from './fields/FriendDropdown';
import ExpansionsDropdown from './fields/ExpansionsDropdown';

const renderFourFriends = (props) => {
  
  if(!props.friendsFetched)
    return <p>You have no friends</p>;
    
  const fourFriends = []
  const MAX_FRIENDS = 3
  
  for(var i = 0; i < MAX_FRIENDS && i < props.friends.length; i++)
    fourFriends.push( 
      <div className="form-group form-group-fat" key={i}>
        <label htmlFor={`friends[${i}]`} > Friend {i+1} </label>
        <FriendDropdown friends={props.friends} index={i} key={i} /> 
      </div>
    );
    
  return fourFriends;       
}



const renderField = ({input, label, type, meta: { touched, error, warning } }) => {
  const hasError = touched && error ? "has-error" : "";
  return (
    <div className={`form-group form-group-fat ${hasError}`}>
      <label htmlFor={input.name} className="control-label">{label}</label>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
}
    
const CampaignCreateForm = (props) => {
    
    const { handleSubmit } = props;
    
    const required = value => value ? undefined : 'Required'
    const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
    const maxLength15 = maxLength(15)
    
    return (
      <form onSubmit={handleSubmit}>
        
        <Field name="campaignName" type="text" component={renderField} validate={[ required, maxLength15 ]} label="Name" />
        <Field name="campaignDescription" type="text" component={renderField} label="Description" />
        
        <div className="form-group form-group-fat">
          <label htmlFor="campaignExpansion">Expansion</label>
          <ExpansionsDropdown /> 
        </div>
        
        <fieldset>
          <legend>Invite Friends</legend>
          { renderFourFriends(props) }
        </fieldset>
        
        <div className="row text-center-xs campaign-edit-buttons">
          <div className="col-md-6">
            <button type="submit" className="btn btn-primary btn-lg btn-block">Create</button>
          </div>
          <div className="col-md-6">
            <Link to="/campaigns" className="btn btn-warning btn-lg btn-block">Cancel</Link>
          </div>
        </div>
        
      </form>
    );
}



export default reduxForm({
  form: 'campaignCreate'
})(CampaignCreateForm)