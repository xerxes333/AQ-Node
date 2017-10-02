import React from "react";

class GuildHeroInfo extends React.Component {

  render(){
      const {hero, isEditing, hasHero} = this.props
      
      if(!hero.icon) hero.icon = "none.png"
      
      const lvl = (hero.level && hero.level > 1) ? <sup>{hero.level.toString()}</sup> : "";
      
      return (
        <div className="row">
          <div className="col-md-12">
            
            {hasHero && 
              <div className="panel panel-default panel-hero">
                
                {!isEditing && 
                  <div className="panel-heading">
                    {hero.name} {lvl}
                  </div>
                }
                
                
                
                <div className="panel-body">
                  <table className="hero-info">
                    <tbody>
                      <tr>
                      
                        <td className="effect" >
                          {hero.effect}
                        </td>
                        
                        <td className="portrait-cell">
                          <img src={`images/heroes/icons/${hero.icon}`} className="img-responsive portrait" alt={hero.name} />
                          
                          <div className="icons">
                            <img src={require('../../public/images/def.png')} className="img-responsive" alt="defense"/> 
                            <span className="hero-def">{hero.defense}</span>
                          </div>
                        
                          <div className="icons">
                            <img src={require('../../public/images/hp.png')} className="img-responsive" alt="health"/>
                            <span className="hero-hp">{hero.health}</span>
                          </div>
                        </td>
                
                      </tr>
                    </tbody>
                  </table>
                </div>
                
              </div>
            }
            
        
            
          </div>
        </div>
      
      );  
  };
}

export default GuildHeroInfo;