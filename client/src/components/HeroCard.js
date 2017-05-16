import React from "react";

class HeroCard extends React.Component {

  render() {

    const hero = this.props.hero
    
    return (
      <div key={hero._id} className="col-md-6 col-xs-12" >
            
        <div className="row hero-row">
        
          <div className="col-md-6 col-xs-12">
            {(hero.image)?
            <img src={hero.image.replace(/^http?:/i, "")} className="img-responsive" alt={hero.name}/>
            : <img src={require('../../public/images/BlankCard-Hero.jpg')} className="img-responsive" alt={hero.name}/>
            }
          </div>
          
          <div className="col-md-6 col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">{hero.name}</div>
              <table className="table table-condensed table-bordered hero-info">
                  <tbody>
                    <tr>
                      <td>Defense: {hero.defense}</td>
                      <td>Health: {hero.health}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="ability-info">
                        <strong><em>{hero.ability}</em></strong>
                        <div>{hero.effect}</div>
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>
          </div>
          
        </div>
              
        </div>
    );
  };
}

export default HeroCard;
