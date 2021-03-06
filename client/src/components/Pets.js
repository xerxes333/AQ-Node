import React from "react";
import { connect } from "react-redux";

import { fetchPets } from '../actions/petActions';
import Loading from './Loading'
import PetLevelDropdown from './forms/fields/PetLevelDropdown'
import GuildHeroInfo from './GuildHeroInfo';
import SectionHeader from './SectionHeader'

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

        <SectionHeader name="Pets" create={false} filter={true}>
          
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label">Filter</label>
              <div className="col-sm-10">
                <PetLevelDropdown handleChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </form>
          
        </SectionHeader>
        
        {Rows}
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Pets);