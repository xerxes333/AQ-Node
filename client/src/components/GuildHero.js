import React from "react";

// import CampaignHero from './CampaignHero';

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
      // const items = this.props.hero.items;
      var image = hero.image.replace(/^http?:/i, "");
      
      // const Items = items.map((item, index)=>{
      //   return (
      //     <div className="col-md-6 col-xs-6 item-detail" key={index +'-'+ item._id}>
      //       {item.number} {item.name} 
      //       <img src={require('../../public/images/blank_melee.png')} className="img-responsive" alt={item.name} title={item.name}/>
      //     </div>
      //   );
      // });
      
      
      return (
        <div className="col-md-3 hero-detail" >
        
          <div className="row">
            <div className="col-md-12">
              <img src={image} className="img-responsive" alt={hero.name}/>
            </div>
          </div>
          
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