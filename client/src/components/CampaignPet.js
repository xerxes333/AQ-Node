import React from "react";

class CampaignPet extends React.Component {
    
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

    render(){
        
        const pet = this.props.pet;
        const ItemRows = this.renderItemRows(pet.items);
        
        return (
          <div className="row hero-row">
              <div className="col-md-12">
                <table className="table table-bordered table-condensed item-table">
                  <thead>
                    <tr>
                      <th className="hero-name">{pet.pet_id.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ItemRows}
                  </tbody>
                </table>
              </div>
            </div>
        );  
    };
}

export default CampaignPet;