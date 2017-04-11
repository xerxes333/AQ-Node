import React from "react";
import { Field } from 'redux-form';

class HeroesDropdown extends React.Component {

  render(){
      const { heroes, index } = this.props;
      
      const List = heroes.map((hero, index)=>{
        return (
          <option value={hero._id} key={hero._id}> {hero.name}</option>
        );
      });
      
      return (
        <Field name={`hero[${index}]`} component="select" className="form-control" onChange={this.props.onChange}>
          <option value="">-- Choose Hero --</option>
          {List}
        </Field>
      
      );  
  };
}

export default HeroesDropdown;