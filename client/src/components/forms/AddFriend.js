import React from 'react'
import { connect } from "react-redux";
import { reduxForm, Field } from 'redux-form'

function mapStateToProps(store) {
  return {
    user: store.user.user,
    addFriendError: store.user.error,
    errorMessage: store.user.errorMessage,
  };
}

const validate = (values, meta) => {
  
  const errors = {}
  
  // if(!values.friendEmail)
  //   errors.friendEmail = "Required"
  if(values.friendEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.friendEmail))
    errors.friendEmail = "Must be a valid email"
  
  return errors
  
}

const renderField = ({ input, label, type, name, placeholder, meta: { touched, error, warning } }) => (
  <div className={ "form-group form-group-fat " + (touched && error? "has-error" : "" ) }>
    <label className="sr-only" htmlFor={name}>{label}</label>
    <div className="input-group input-group-fat">
      <input {...input} type={type} name={name} className="form-control" placeholder={placeholder}/>
      <span className="input-group-btn">
          <button className={ "btn btn-fat " + (touched && error? "btn-danger" : "btn-success" )}  type="submit">
            <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add
          </button>
      </span>
    </div>
    {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

class AddFriend extends React.Component {
  
  render(){
    
    const { handleSubmit, addFriendError, errorMessage } = this.props;
    
    return (
      <form onSubmit={handleSubmit} className="form-inline" >
        <Field name="friendEmail" placeholder="Friend Email" label="Add Friend!" component={renderField} type="text" />
        {addFriendError && <div className="text-danger">{errorMessage}</div>}
      </form>
    )
    
  }
  
}

AddFriend = reduxForm({
  form: 'addFriend',
  validate
})(AddFriend);

export default connect(mapStateToProps)(AddFriend);
