import React from "react";
import { connect } from "react-redux";
import { Field } from 'redux-form';

import { fetchPets } from '../../../actions/petActions';
import GuildHeroInfo from '../../GuildHeroInfo';

function mapStateToProps(store) {
  return { 
    pets: store.pets.pets || [],
    fetched: store.pets.fetched,
    fetching: store.pets.fetching,
    form: store.form.editGuild,
  };
}

class PetsDropdown extends React.Component {
  
  componentWillMount(){
    if(!this.props.fetched && !this.props.fetching)
      this.props.dispatch(fetchPets());
  }
  
  getPet(){
    const { form, pets, index } = this.props;
    
    if(!form || !form.values.pets[index].id)
      return {}
    
    const id = form.values.pets[index].id;
    const Pet = pets.filter((pet)=>{
      return id === pet._id;
    });
    
    if(Pet.length === 1)
      return Pet[0];
    
    return null
  }
  
  getPetInfo(){
    const pet = this.getPet();
    
    return <GuildHeroInfo 
      hero={pet} 
      isEditing={true} 
      hasHero={(pet && Object.getOwnPropertyNames(pet).length > 0)}/>
  }
  
  render(){
    const { pets, index, name, filter } = this.props;
    const fieldName = name;
    const currentPet = this.getPet()
    
    if(!currentPet)
      return <div>Loading</div>
      
    const Options = pets.filter((pet)=>{
      if(filter)
        return pet.level.toString() === filter || pet._id === currentPet._id
      return true
    })
    .map((pet, index)=>{
      return (
        <option value={pet._id} key={pet._id}>{pet.name}</option>
      );
    });
    
    return (
      <div className="form-group">
        <label className="sr-only" htmlFor={fieldName} > Pet {index+1} </label>
          
        <div className="input-group input-group-lg-mobile">
          <span className="input-group-btn">
            <button className="btn btn-danger" type="button" onClick={this.props.removePet}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </span>
          
          <Field name={fieldName} component="select" className="form-control">
            <option value="">-- Choose Pet --</option>
            {Options}
          </Field>      
        </div>
          
        {this.getPetInfo()}
          
      </div>
    )
  }
}

export default connect(mapStateToProps)(PetsDropdown);