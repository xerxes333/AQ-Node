import React, { Component } from 'react';
import logo from './logo.svg';
import Client from './Client';
import { observer } from 'mobx-react';

const Content = observer(class Content extends Component {
    
  constructor() {
    super();
    this.state= {
      'data': []
    };
    Client.search('help', (data) => {
      this.setState({
        data: data,
      });
    });
    
  };
  
 render() {
     var style = {'textAlign': 'left'};
     return(
         <div>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload!
            </p>
            <pre style={style}>
                {/*JSON.stringify(this.state.data, null, 2)*/}
            </pre>
            <pre style={style}>
              {JSON.stringify(this.props,null,2)}
            </pre>
        </div>
     );
 }
 
});

export default Content;