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
    
    return (
      <div>
        <h2>Heroes</h2>
        <div className="row">
          {Heroes}
        </div>
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Heroes);