import React from "react";
import { connect } from "react-redux";

import { fetchItems} from '../actions/itemActions';
import Loading from './Loading'
import ItemSetDropdown from './forms/fields/ItemSetDropdown'

function mapStateToProps(store) {
  return { 
    items: store.items.items,
    itemsFetched: store.items.fetched
  };
}

class Items extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      filter: false,
      sort: false,
    };
  }
  
  componentWillMount() {
    
    if(!this.props.itemsFetched && this.props.items.length === 0)
      this.props.dispatch(fetchItems());
    else
      console.log('getting items from store');
  }
  
  handleChange(event) {
    if(!event.target.value)
      this.setState({filter: false});
    this.setState({filter: event.target.value});
  }
  
  renderAtkIcon(item){
    
      if(!item.atk) return "";
      
      var attackClass = (item.class === 'Ranged Attack' ) ? 'item-card-ranged.png' : 'item-card-melee.png' ;
      
      return (
        <div className="icons pull-right">
          <img src={require('../../public/images/' + attackClass)} className="img-responsive item-card-icon-32" alt="item attack"/>
          <span className="item-atk">{item.atk}</span>
        </div>
      );
  }
  
  renderPriceIcon(item){
      if(!item.price && item.price !== 0) return "";
      
      return (
        <div className="icons pull-right">
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
        <span className="item-type">{this.renderClassType(item)}</span>
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
    
    const FilteredItems = this.props.items.filter((item, i)=>{
      if(this.state.filter)
        return item.set === this.state.filter
      return true
    })
    
    const Items = FilteredItems.map((item)=>{
      return <tr key={item._id}>
        <td className="text-nowrap">{item.number}</td>
        <td>{this.renderPriceIcon(item)}</td>
        <td className="text-nowrap">{item.name}</td>
        <td>{this.renderAtkIcon(item)}</td>
        <td>{this.renderDescription(item)}</td>
      </tr>
    })
    
    const ItemsSmall = FilteredItems.map((item, index)=>{
      return <div className="panel panel-default" key={index}>
      
        <div className="panel-heading" role="tab" id={item._id}>  
          <a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse${item._id}`} aria-expanded="false" aria-controls={`collapse${item._id}`}>
            <div className="items-panel-title">
              <h4 className="panel-title">
                  <strong>{item.number}:</strong> <span className="text-info">{item.name}</span>
              </h4>
              {this.renderPriceIcon(item)}
              {this.renderAtkIcon(item)}
            </div>
          </a>
        </div>
        
        <div id={`collapse${item._id}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={item._id}>
          <div className="panel-body items-panel-body">
            
            {this.renderDescription(item)}
          </div>
        </div>
        
      </div>
    })
    
    
    if(window.innerWidth < 768)
      return (
        <div>
        
          <div className="row">
            <div className="col-md-8">
              <h2>Items</h2>
            </div>
            <div className="col-md-4">
              <div className="well form-inline">
                <strong>Filter </strong>
                <ItemSetDropdown handleChange={this.handleChange.bind(this)}/>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-12">
              <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
               {ItemsSmall}
              </div>
            </div>
          </div>
          
        </div>
      )
    
    return (
      <div>
        
        <div className="row">
          <div className="col-md-8">
            <h2>Items</h2>
          </div>
          <div className="col-md-4">
            <div className="well form-inline">
              <strong>Filter </strong>
              <ItemSetDropdown handleChange={this.handleChange.bind(this)}/>
            </div>
          </div>
        </div>
        
        <div className="row table-responsive">
          <div className="col-md-12">
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
        
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Items);