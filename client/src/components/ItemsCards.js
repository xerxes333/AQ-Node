import React from "react";
import { connect } from "react-redux";

import { fetchItems} from '../actions/itemActions';
// import HeroCard from './HeroCard';

function mapStateToProps(store) {
  return { 
    items: store.items.items,
    itemsFetched: store.items.fetched
  };
}

class Items extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(fetchItems());
  }
  
  render() {
    
    if(!this.props.itemsFetched){
      return <div>Loading</div>;
    }
    
    const Items = this.props.items.map((item)=>{
      return <tr key={item._id}>
        <td className="text-nowrap">{item.number}</td>
        <td className="text-nowrap">{item.name}</td>
        <td>{item.description}</td>
        <td>{item.price}</td>
        <td className="text-nowrap">{item.class}</td>
        <td>{item.type}</td>
      </tr>
    });
    
    return (
      <div>
        <h2>Items</h2>
          <div className="row">
            <div className="col-md-2 col-xs-6">
              <div className="foo">
                <div className="foo-name">
                  Tome of Enlightenment
                </div>
              </div>
            </div>
            <div className="col-md-2 col-xs-6">
              <div className="foo"></div>
            </div>
          </div>
      </div>
    );
    
  }
}

export default connect(mapStateToProps)(Items);