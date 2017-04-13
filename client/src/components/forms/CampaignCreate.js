import React from 'react'
import { Field, reduxForm } from 'redux-form';
import FriendDropdown from './fields/FriendDropdown';

const renderFourFriends = (props) => {
  
  if(!props.friendsFetched)
    return <p>You have no friends</p>;
    
  const fourFriends = []
  for(var i = 0; i < 3; i++)
    fourFriends.push( 
      <div className="form-group" key={i}>
        <label htmlFor={`friends[${i}]`} > Friend {i+1} </label>
        <FriendDropdown friends={props.friends} index={i} key={i} /> 
      </div>
    );
    
  return fourFriends;       
}



const renderField = ({input, label, type, meta: { touched, error, warning } }) => {
  const hasError = touched && error ? "has-error" : "";
  return (
    <div className={`form-group ${hasError}`}>
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
        
          <Field name="campaignName"
            type="text"
            component={renderField} 
            validate={[ required, maxLength15 ]}
            label="Name"
          />
      
        <div className="form-group">
          <label htmlFor="campaignDescription">Description</label>
          <Field name="campaignDescription"  component="input" type="text" className="form-control" placeholder="Description" />
        </div>
        
        <fieldset>
          <legend>Invite Friends</legend>
          { renderFourFriends(props) }
        </fieldset>
        
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
}



export default reduxForm({
  form: 'campaignCreate'
})(CampaignCreateForm)