import React from "react";

import GuildHeroInfo from './GuildHeroInfo';

class GuildHero extends React.Component {

  itemsTable(){
    const items = this.props.hero.items;
    const rows = items.map((item, index)=>{
          return  <tr key={index}><td>{item.number}</td><td>{item.name}</td></tr>
      })
      
    return <table className="table table-bordered">
      <tbody>
        {rows}
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
            </div>
          </div>
          
        </div>
      
      );  
  };
}

export default GuildHero;