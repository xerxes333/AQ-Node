import React from 'react'
import { connect } from "react-redux";
import { createUser } from '../actions/userActions';

function mapStateToProps(store) {
  return { 
    user: store.user,
  };
}

class Join extends React.Component {
  
  handleSubmit(event) {
    
    event.preventDefault();
    
    this.props.dispatch( 
      createUser({ 
        username: this.refs.email.value.trim().toLowerCase(),
        name: this.refs.name.value.trim(),
        password: this.refs.password.value.trim(),
        confirm: this.refs.passwordConfirm.value.trim()
      })
    );
    
  }
  
  render() {
    
    const { errorMessage } = this.props.user
    
    return (
        <div className="row">
            <div className="col-md-6 col-md-offset-3 jumbotron">
                <h2>Join</h2>
                
                <form action="" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email Address</label>
                    <input type="text" ref="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="userName">Name</label>
                    <input type="text" ref="name" className="form-control" id="userName" placeholder="Name" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref="password" className="form-control" id="password" placeholder="Password" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" ref="passwordConfirm" className="form-control" id="passwordConfirm" placeholder="Confirm" />
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Join
                  </button>
                </form>
                
                {errorMessage &&
                  <p style={{color:'red'}}>{errorMessage}</p>
                }
            </div>
        </div>
    )
  }
  
}

Join.propTypes = {
  errorMessage: React.PropTypes.string
}

export default connect(mapStateToProps)(Join);