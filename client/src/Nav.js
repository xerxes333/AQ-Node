import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from "react-redux";

import { logoutUser } from './actions/authActions';

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

class Nav extends Component {
  
  renderProfileLink(){
    return(
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span className="caret"></span></a>
        <ul className="dropdown-menu">
            <li><Link to="profile">Profile</Link></li>
            <li><Link to="logout"onClick={(event) => this.props.dispatch(logoutUser()) } >Logout</Link></li>
        </ul>
      </li>
    );
  }
  
  render() {
    const { isAuthenticated } = this.props;
    return (
         <nav className="navbar-inverse navbar-fixed-top navbar" id="w0" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#w0-collapse">
                  <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">AQ Guild Manager</Link>
            </div>
            <div className="collapse navbar-collapse" id="w0-collapse">
              <ul className="navbar-nav navbar-right nav" id="w1">
                {  isAuthenticated && <li><Link to="campaigns">Campaigns</Link></li> }
                {  isAuthenticated && <li><Link to="guilds">Guilds</Link></li> }
                <li><Link to="heroes">Heroes</Link></li>
                <li><Link to="items">Items</Link></li>
                { !isAuthenticated && <li><Link to="login">Login</Link></li> }
                {  isAuthenticated && this.renderProfileLink() }
              </ul>
            </div>
          </div>
        </nav>
    );
  }
 
}

export default connect(mapStateToProps)(Nav);