import React from "react";
import { connect } from "react-redux";

import { fetchHeroes} from '../actions/heroActions';
import HeroCard from './HeroCard';
import Loading from './Loading'
import HeroSetDropdown from './forms/fields/HeroSetDropdown'

function mapStateToProps(store) {
  return { 
    heroes: store.heroes.heroes,
    heroesFetched: store.heroes.fetched
  };
}

class Heroes extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      filter: false,
      sort: false,
    };
  }
  
  componentWillMount() {
    this.props.dispatch(fetchHeroes());
  }
  
  handleChange(event) {
    if(event.target.value === "" || !event.target.value)
      this.setState({filter: false});
    this.setState({filter: event.target.value});
  }
  
  render() {
    
    if(!this.props.heroesFetched)
      return <Loading title="Heroes"/>
    
    const Heroes = this.props.heroes.filter((hero, i)=>{
      if(this.state.filter)
        return hero.set === this.state.filter
      return true
    })
    .map((hero, index)=>{
      return <HeroCard hero={hero} key={hero._id} />
    })
    
    
    // Dirty way to get grid to render properly
    var Rows = []
    for(var i = 0; i < Heroes.length; i+=4){
      Rows.push(
        <div className="row" key={i}>
          {Heroes[i]}
          {Heroes[i+1]}
          {Heroes[i+2]}
          {Heroes[i+3]}
        </div>
      )
    }
    
    return (
      <div>
        <h2>Heroes</h2>
        <div className="row form-inline">
          <div className="col-md-12">
            <strong>Filter </strong>
            <HeroSetDropdown handleChange={this.handleChange.bind(this)}/>
          </div>
        </div>
        {Rows}
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Heroes);