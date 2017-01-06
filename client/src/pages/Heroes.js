import React from "react";
import Client from '../Client';

export default class Heroes extends React.Component {
  
  constructor() {
    super();
    this.state= {
      'heroes': []
    };
    Client.search('heroes', (data) => {
      this.setState({
        heroes: data,
      });
    });
    
  };
  
  render() {
      
    return (
      <div>
        <h1>Heroes</h1>
        <pre>
            {JSON.stringify(this.state.heroes, null, 2)}
        </pre>
      </div>
    );
    
  }
}