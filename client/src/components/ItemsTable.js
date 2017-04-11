import React from "react";
import { connect } from "react-redux";

import { fetchItems} from '../actions/itemActions';
import Loading from './Loading'

function mapStateToProps(store) {
  return { 
    items: store.items.items,
    itemsFetched: store.items.fetched
  };
}

class Items extends React.Component {
  
  componentWillMount() {
    
    if(!this.props.itemsFetched && this.props.items.length === 0)
      this.props.dispatch(fetchItems());
    else
      console.log('getting items from store');
  }
  
  renderAtkIcon(item){
    
      if(!item.atk) return "";
      
      var attackClass = (item.class === 'Ranged Attack' ) ? 'item-card-ranged.png' : 'item-card-melee.png' ;
      
      return (
        <div className="icons">
          <img src={require('../../public/images/' + attackClass)} className="img-responsive item-card-icon-32" alt="item attack"/>
          <span className="item-atk">{item.atk}</span>
        </div>
      );
  }
  
  renderPriceIcon(item){
      if(!item.price && item.price !== 0) return "";
      
      return (
        <div className="icons">
          <img src={require('../../public/images/item-card-price.png')} className="img-responsive item-card-icon-32" alt="item price"/>
          <span className="item-price">{item.price}</span>
        </div>
      );
  }
  
  renderHpIcon(item){
    if(!item.hp) return "";
      
      return (
        <div className="icons">
          <img src={require('../../public/images/item-card-hp.png')} className="img-responsive item-card-icon-32" alt="item hp"/>
          <span className="item-hp">
            <sup>+</sup>
            {item.hp}
          </span>
        </div>
      );
  }

  renderDefIcon(item){
    if(!item.def) return "";
      
    return (
      <div className="icons">
        <img src={require('../../public/images/item-card-def.png')} className="img-responsive item-card-icon-32" alt="item def"/>
        <span className="item-def"><sup>+</sup>{item.def}</span>
      </div>
    );
  }
  
  renderRollIcon(item){
    if(!item.roll) return "";
      
    return (
      <div className="icons">
        <img src={require('../../public/images/item-card-roll.png')} className="img-responsive item-card-icon-32" alt="item roll"/>
        <span className="item-roll"><sup>+</sup>{item.roll}</span>
      </div>
    );
  }
  
  renderClassType(item){
    return (
      <div className="class-type">
        {item.class} - {item.type}
      </div>
    );
  }
  
  renderDescription(item){
    return (
      <div>
        {this.renderClassType(item)}
        {item.description}
        <div>
          {this.renderHpIcon(item)}
          {this.renderDefIcon(item)}
          {this.renderRollIcon(item)}
        </div>
      </div>
    );
  }
  
  render() {
    
    if(!this.props.itemsFetched)
      return <Loading title="Items"/>
    
    const Items = this.props.items.map((item)=>{
      return <tr key={item._id}>
        <td className="text-nowrap">{item.number}</td>
        <td>{this.renderPriceIcon(item)}</td>
        <td className="text-nowrap">{item.name}</td>
        <td>{this.renderAtkIcon(item)}</td>
        <td>{this.renderDescription(item)}</td>
      </tr>
    });
    
    return (
      <div>
        
        <h2>Items</h2>
          
          <div className="visible-xs-block text-muted">
            scroll <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span> 
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-bordered items">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Price</td>
                  <td>Name</td>
                  <td>Atk</td>
                  <td>Description</td>
                </tr>
              </thead>
              <tbody>
                {Items}
              </tbody>
            </table>
        </div>
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Items);