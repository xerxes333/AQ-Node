import React from "react";
import { connect } from "react-redux";

import { fetchPets } from '../actions/petActions';
import Loading from './Loading'
import PetLevelDropdown from './forms/fields/PetLevelDropdown'
import GuildHeroInfo from './GuildHeroInfo';

function mapStateToProps(store) {
  return { 
    pets: store.pets.pets,
    petsFetched: store.pets.fetched
  };
}

class Pets extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      filter: "1",
      sort: false,
    };
  }
  
  componentWillMount() {
    this.props.dispatch(fetchPets());
  }
  
  handleChange(event) {
    if(event.target.value === "" || !event.target.value)
      this.setState({filter: 1});
    this.setState({filter: event.target.value});
  }
  
  render() {
    
    if(!this.props.petsFetched)
      return <Loading title="Pets"/>
    
    const Pets = this.props.pets.filter((pet, i)=>{
      if(this.state.filter)
        return pet.level.toString() === this.state.filter
      return true
    })
    .map((pet, index)=>{
      return <div className="col-md-3 hero-detail" >
        <GuildHeroInfo hero={pet} hasHero={(pet)} />
      </div>
    })
    
    
    // Dirty way to get grid to render properly
    var Rows = []
    for(var i = 0; i < Pets.length; i+=4){
      Rows.push(
        <div className="row" key={i}>
          {Pets[i]}
          {Pets[i+1]}
          {Pets[i+2]}
          {Pets[i+3]}
        </div>
      )
    }
    
    return (
      <div>
      
        <div className="row">
          <div className="col-md-8">
            <h2>Pets</h2>
          </div>
          <div className="col-md-4">
            <div className="well form-inline">
              <strong>Filter </strong>
              <PetLevelDropdown handleChange={this.handleChange.bind(this)}/>
            </div>
          </div>
        </div>
        
        {Rows}
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Pets);