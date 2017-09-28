import React from "react";
import { connect } from "react-redux";

import { fetchHeroes} from '../actions/heroActions';
import Loading from './Loading'
import HeroSetDropdown from './forms/fields/HeroSetDropdown'
import GuildHeroInfo from './GuildHeroInfo';
import SectionHeader from './SectionHeader'

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
      // return <HeroCard hero={hero} key={hero._id} />
      return <div className="col-md-3 hero-detail" ><GuildHeroInfo hero={hero} hasHero={(hero)}/></div>
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
        
        <SectionHeader name="Heroes" create={false} filter={true}>
          
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-sm-2 control-label">Filter</label>
              <div className="col-sm-10">
                <HeroSetDropdown handleChange={this.handleChange.bind(this)} />
              </div>
            </div>
          </form>
          
        </SectionHeader>
        
        {Rows}
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Heroes);