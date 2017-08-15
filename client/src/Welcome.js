import React, { Component } from 'react';
import logo from '../public/images/logo-arcadia-quest.png';

class Content extends Component {
    
  constructor() {
    super();
    this.state= {
      'data': []
    };
  };
  
  render() {
    
     return(
         <div className="welcome row">
           <div className="col-md-12">
              <h1>Welcome to the Arcadia Quest Campaign Manager</h1>
              <img src={logo} className="img-responsive logo" alt="logo"/>
          </div>
        </div>
     );
  }

}

export default Content;