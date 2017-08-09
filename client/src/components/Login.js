import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router';
import { loginUser } from '../actions/authActions';

function mapStateToProps(store) {
  return { 
    user: store.auth,
  };
}

class Login extends React.Component {
  
  handleSubmit(event) {
    event.preventDefault();
    const username = this.refs.email
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    
    this.props.dispatch(loginUser(creds));
  }
  
  // TODO: componentWillUnmount remove the errormessage
  
  render() {
    
    const { errorMessage } = this.props.user
    
    return (
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="jumbotron">
              
                <h2>Login</h2>
                
                <form action="" onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email Address</label>
                    <input type="text" ref="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" ref="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
                
                {errorMessage &&
                  <p className="text-danger">{errorMessage}</p>
                }
                
                <br/>
                <br/>
                Are you new here? <Link to={`/join`}>Join now!</Link>
                
              </div>
            </div>
        </div>
    )
  }
  
}

Login.propTypes = {
  // loginUser: React.PropTypes.func.isRequired,
  errorMessage: React.PropTypes.string
}

export default connect(mapStateToProps)(Login);