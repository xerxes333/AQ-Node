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

  navLink(props){
    var active = (this.props.pathname.indexOf(`${props.to}`) !== -1)? "active" : ""
    return (
      <li className={active} >
        <Link to={props.to} className="hidden-xs" >{props.label}</Link>
        {(props.to === "logout")?
          <Link to={props.to} className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse" onClick={(event) => this.props.dispatch(logoutUser()) }>{props.label}</Link>
          : <Link to={props.to} className="visible-xs" data-toggle="collapse" data-target=".navbar-collapse">{props.label}</Link>
        }
        
      </li>
    )
  }
  
  renderProfileLink(){
    return(
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span className="caret"></span></a>
        <ul className="dropdown-menu">
            { this.navLink({to: "profile", label: "Profile"}) }
            { this.navLink({to: "logout", label: "Logout"}) }
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
                {  isAuthenticated && this.navLink({to: "campaigns", label: "Campaigns"}) }
                {  isAuthenticated && this.navLink({to: "guilds", label: "Guilds"}) }
                { this.navLink({to: "heroes", label: "Heroes"}) }
                { this.navLink({to: "items", label: "Items"}) }
                { !isAuthenticated && this.navLink({to: "login", label: "Login"}) }
                {  isAuthenticated && this.renderProfileLink() }
              </ul>
            </div>
          </div>
        </nav>
    );
  }
 
}

export default connect(mapStateToProps)(Nav);