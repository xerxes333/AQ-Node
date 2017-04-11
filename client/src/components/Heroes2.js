import React from "react";
import { connect } from "react-redux";

import { fetchHeroes} from '../actions/heroActions';

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
    
    console.log(this.props.heroes);
    
    if(!this.props.heroesFetched){
      return <div>Loading</div>;
    }
    
    const HeroRows = this.props.heroes.map((hero, index)=>{
      return (
        <tr key={hero._id}>
          <td>
            <strong>{hero.name}</strong>
            <img src={hero.image.replace(/^http?:/i, "")} className="img-responsive hero-info-image-96" alt={hero.name}/>
          </td>
          <td>{hero.defense}</td>
          <td>{hero.health}</td>
          <td>
            <strong><em>{hero.ability}</em></strong>
            <p>{hero.effect}</p>
          </td>
        </tr>  
      );
    });
    
    return (
      <div>
        <h2>Heroes</h2> 
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Defense</th>
              <th>Health</th>
              <th>Ability</th>
            </tr>
          </thead>
          <tbody>
            {HeroRows}
          </tbody>
        </table>
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Heroes);