import React from "react";

class PetLevelDropdown extends React.Component {

  render(){
    
      const List = [1,2,3].map((obj, index)=>{
        return (
          <option value={obj} key={obj}>Level {obj}</option>
        )
      })
      
      return (
        <div className="form-group">
          <select className="form-control" onChange={this.props.handleChange} >
            {List}
          </select>
        </div>
      
      );  
  };
}

export default PetLevelDropdown