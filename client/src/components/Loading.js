import React from "react";

class Loading extends React.Component {
    
  render() {
    
    return <div>
      <h2>{this.props.title}</h2>
      <span className="glyphicon glyphicon-refresh glyph-loading"></span> Loading...
    </div>
  }
}
export default Loading