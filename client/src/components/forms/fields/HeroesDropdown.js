import React from "react";
import { connect } from "react-redux";
import { Field } from 'redux-form';

import { fetchHeroes} from '../../../actions/heroActions';
import GuildHeroInfo from '../../GuildHeroInfo';

function mapStateToProps(store) {
  return { 
    heroes: store.heroes.heroes || [],
    fetched: store.heroes.fetched,
    fetching: store.heroes.fetching,
    form: store.form.editGuild,
  };
}

class HeroesDropdown extends React.Component {
  
  componentWillMount(){
    if(!this.props.fetched && !this.props.fetching)
      this.props.dispatch(fetchHeroes());
  }
  
  getHero(){
    const { form, heroes, index } = this.props;
    
    if(!form || !form.values.heroes[index].id)
      return {}
    
    const id = form.values.heroes[index].id;
    const Hero = heroes.filter((hero)=>{
      return id === hero._id;
    });
    
    if(Hero.length === 1)
      return Hero[0];
    
    return null
  }
  
  getHeroImage(){
    
    const hero = this.getHero();
    
    return <GuildHeroInfo 
      hero={hero} 
      isEditing={true} 
      hasHero={(hero && Object.getOwnPropertyNames(hero).length > 0)}/>
    
    // if(hero && Object.getOwnPropertyNames(hero).length > 0 && hero.image !== "")
    //   return  <img src={hero.image.replace(/^http?:/i, "")} className="img-responsive" alt={hero.name}/>
    
    // return <img src={require('../../../../public/images/BlankCard-Hero.jpg')} className="img-responsive" alt={hero.name}/>
  }
  
  render(){
    const { heroes, index, name, filter } = this.props;
    const fieldName = name;
    const currentHero = this.getHero()
    
      
    if(!currentHero)
      return <div>Loading</div>
    
    const Options = heroes.filter((hero)=>{
      if(filter)
        return hero.set === filter || hero._id === currentHero._id
      return true
    })
    .map((hero, index)=>{
      return (
        <option value={hero._id} key={hero._id}> {hero.name}</option>
      );
    });
    
    return (
      <div className="form-group">
        <label className="sr-only" htmlFor={fieldName} > Hero {index+1} </label>
          
          
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-danger btn-lg-remove" type="button" onClick={this.props.removeHero}>
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
            </span>
            
            <Field name={fieldName} component="select" className="form-control">
              <option value="">-- Choose Hero --</option>
              {Options}
            </Field>      
          </div>
          
          {this.getHeroImage()}
          
      </div>
    );  
  };
}

export default connect(mapStateToProps)(HeroesDropdown);