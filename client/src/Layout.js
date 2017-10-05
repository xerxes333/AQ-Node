import React, { Component } from 'react';
import { connect } from "react-redux";

import Nav from './Nav';
// import './App.css';

function mapStateToProps(store) {
  return {
    user: store.user || {},
    isAuthenticated: store.auth.isAuthenticated,
  };
}

class Layout extends Component {

  render() {
    
    const { user, location, children } = this.props
    
    // if(user.fetched && user.user.darkTheme){
    //   require("./bootswatch/darkly/darkly.css") 
    //   require("./App_dark.css")
    // }
    
    // require("./bootswatch/default/bootstrap.min.css")
    // require("./App_light.css")
    require("./bootswatch/darkly/darkly.css") 
    require("./App_dark.css")
    
    return (
      <div>
        <Nav pathname={location.pathname} />
        
        <div className="container content">
          {children}
        </div>
        
      </div>
    );
  }
  
}

export default connect(mapStateToProps)(Layout);
