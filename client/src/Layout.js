import React, { Component } from 'react';
import { connect } from "react-redux";

import Nav from './Nav';
import './App.css';

function mapStateToProps(store) {
  return {
  };
}

class Layout extends Component {

  render() {
    return (
      <div>
        
        <Nav pathname={this.props.location.pathname} />
        
        <div className="container content">
          {this.props.children}
        </div>
        
      </div>
    );
  }
  
}

export default connect(mapStateToProps)(Layout);
