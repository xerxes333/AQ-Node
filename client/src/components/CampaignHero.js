import React from "react";

class CampaignHero extends React.Component {
    
    renderItemRows(items){
        if(!items.length)
            return <tr><td>No Items</td></tr>;
            
        const Rows = items.map((item, index)=>{
            return(
                 <tr key={`${index}_${item._id}`}>
                    <td>
                      {item.name} <span className="pull-right">{item.number}</span>
                    </td>
                </tr>
            );
        });
        
        return Rows;
    }
    
    renderCursesRows(curses){
        if(!curses.length)
            return null
            
        const Rows = curses.map((curse, index)=>{
            return(
                 <tr key={`${index}_${curse._id}`}>
                    <td>
                      {curse.name} <span className="pull-right">{curse.number}</span>
                    </td>
                </tr>
            );
        });
        
        return Rows;
    }
    
    
    render(){
        
        const hero = this.props.hero;
        const ItemRows = this.renderItemRows(hero.items);
        const CurseRows = this.renderCursesRows(hero.curses);
        
        return (
          <div className="row hero-row">
              <div className="col-md-12">
                <table className="table table-bordered table-condensed item-table">
                  <thead>
                    <tr>
                      <th className="hero-name">{hero.hero_id.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ItemRows}
                    {CurseRows}
                  </tbody>
                </table>
              </div>
            </div>
        );  
    };
}

export default CampaignHero;