import React from "react";

import GuildHeroInfo from './GuildHeroInfo';

class GuildHero extends React.Component {

  itemsTable(){
    const items = this.props.hero.items;
    
    if(!items || items.length === 0) return null

    return <table className="table table-bordered table-condensed guild-hero-items">
      <thead><tr><th colSpan="2">Items</th></tr></thead>
      <tbody>
        {items.map((item, index)=>{
          return  <tr key={index}><td>{item.number}</td><td>{item.name}</td></tr>
      })}
      </tbody>
    </table>
  }
  
  cursesTable(){
    const curses = this.props.hero.curses;
    
    if(!curses || curses.length === 0) return null
      
    return <table className="table table-bordered table-condensed guild-hero-curses">
      <thead><tr><th colSpan="2">Curses</th></tr></thead>
      <tbody>
        {curses.map((curse, index)=>{
          return  <tr key={index}><td>{curse.number}</td><td>{curse.name}</td></tr>
        })}
      </tbody>
    </table>
  }
      
  render(){
      const hero = this.props.hero.hero_id;
      
      if(!hero.icon) hero.icon = "none.png"
      
      return (
        <div className="col-md-3 hero-detail" >
        
          <GuildHeroInfo hero={hero} hasHero={(hero)}/>
          
          <div className="row">
            <div className="col-md-12">
              {this.itemsTable()}
              {this.cursesTable()}
            </div>
          </div>
          
        </div>
      
      );  
  };
}

export default GuildHero;