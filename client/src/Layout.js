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
        
        <Nav />
        
        <div className="container" style={{'paddingTop': '60px'}}>
          {this.props.children}
        </div>
        
      </div>
    );
  }
  
}

export default connect(mapStateToProps)(Layout);
