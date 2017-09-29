import React from "react";



class PetLevelDropdown extends React.Component {

  render(){
    
      const List = [1,2,3].map((obj, index)=>{
        return (
          <option value={obj} key={obj}>Level {obj}</option>
        )
      })
      
      return (
        <select className="form-control input-fat" onChange={this.props.handleChange} >
          {List}
        </select>
      
      );  
  };
}

export default PetLevelDropdown