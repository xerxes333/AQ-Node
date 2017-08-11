import React from "react";

import GuildHeroInfo from './GuildHeroInfo';

class GuildPet extends React.Component {

  itemsTable(){
    const items = this.props.pet.items;
    
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
  
  render(){
      const pet = this.props.pet.pet_id;
      
      if(!pet.icon) pet.icon = "none.png"
      
      return (
        <div className="col-md-3 hero-detail" >
        
          <GuildHeroInfo hero={pet} hasHero={(pet)}/>
          
          <div className="row">
            <div className="col-md-12">
              {this.itemsTable()}
            </div>
          </div>
          
        </div>
      
      );  
  };
}

export default GuildPet;