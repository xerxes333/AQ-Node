import React, { Component } from 'react';
import Nav from './Nav';
import './App.css';

class Layout extends Component {

  render() {
    
    return (
      <div className="Layout wrap">
        <Nav />
        
        <div className="container" style={{'paddingTop': '60px'}}>
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>
        
      </div>
    );
  }
  
  
  
}

export default Layout;
