import React from "react";

class HeroCard extends React.Component {

  render() {

    const hero = this.props.hero
    
    return (
      <div key={hero._id} className="col-md-3 col-xs-12" >
           
        <div className="panel panel-default text-center">
          <div className="panel-heading text-center"><strong>{hero.name}</strong></div>
          <table className="table table-condensed table-bordered hero-info">
              <tbody>
                <tr>
                  <td colSpan="2">
                    {(hero.image)?
                    <img src={hero.image.replace(/^http?:/i, "")} className="img-responsive" alt={hero.name}/>
                    : <img src={require('../../public/images/BlankCard-Hero.jpg')} className="img-responsive" alt={hero.name}/>
                    }
                  </td>
                </tr>
                <tr>
                  <td>Defense: {hero.defense}</td>
                  <td>Health: {hero.health}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="ability-info" >
                    <strong><em>{hero.ability}</em></strong>
                    <div>{hero.effect}</div>
                  </td>
                </tr>
              </tbody>
          </table>
        </div>
          
              
        </div>
    )
  };
}

export default HeroCard;
