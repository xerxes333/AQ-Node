import React from "react";
import { connect } from "react-redux";

import { fetchHeroes} from '../actions/heroActions';
import HeroCard from './HeroCard';
import Loading from './Loading'

function mapStateToProps(store) {
  return { 
    heroes: store.heroes.heroes,
    heroesFetched: store.heroes.fetched
  };
}

class Heroes extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchHeroes());
  }
  
  render() {
    
    if(!this.props.heroesFetched)
      return <Loading title="Heroes"/>
    
    const Heroes = this.props.heroes.map((hero, index)=>{
      return <HeroCard hero={hero} key={hero._id} />
    });
    
    // Dirty way to get grid to render properly
    var Rows = []
    for(var i = 0; i < Heroes.length; i+=2){
      Rows.push(
        <div className="row" key={i}>
          {Heroes[i]}
          {Heroes[i+1]}
        </div>
      )
    }
    
    return (
      <div>
        <h2>Heroes</h2>
        {Rows}
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Heroes);