import React from "react";

class GuildHeroInfo extends React.Component {

  render(){
      const {hero, isEditing, hasHero} = this.props
      
      if(!hero.icon) hero.icon = "none.png"
      
      return (
        <div className="row">
          <div className="col-md-12">
            
            {hasHero && 
            <table className="table table-bordered guild-hero-info">
            
              {!isEditing && <tr> <th colSpan="2"> {hero.name} </th> </tr> }
              
              <tr>
                <td className="effect">{hero.effect}</td>
                <td className="portrait-cell">
                  
                  <table className="guild-hero-portrait">
                    <tr>
                      <td colSpan="2"> <img src={`images/heroes/icons/${hero.icon}`} className="img-responsive" alt={hero.name} style={{margin: "auto"}}/> </td>
                    </tr>
                    <tr>
                      <td> 
                        <div className="icons">
                          <img src={require('../../public/images/def.png')} className="img-responsive" alt="defense"/> 
                          <span className="hero-def">{hero.defense}</span>
                        </div>
                      </td>
                      <td> 
                        <div className="icons">
                          <img src={require('../../public/images/hp.png')} className="img-responsive" alt="health"/>
                          <span className="hero-hp">{hero.health}</span>
                        </div>
                      </td>
                    </tr>
                  </table>
            
                </td>
              </tr>
            </table>
            }
            
        
            
          </div>
        </div>
      
      );  
  };
}

export default GuildHeroInfo;