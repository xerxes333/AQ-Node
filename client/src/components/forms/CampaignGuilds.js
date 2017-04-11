import React from 'react'
import { Field, reduxForm } from 'redux-form';

const CampaignGuildsForm = (props) => {
    
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
          <legend>Add Friends</legend>
          { renderFourFriends(props) }
        </fieldset>
        
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
}



export default reduxForm({
  form: 'campaignGuilds'
})(CampaignGuildsForm)