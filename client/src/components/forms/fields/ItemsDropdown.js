import React from "react";
import { connect } from "react-redux";
import { Field } from 'redux-form';

import { fetchItems} from '../../../actions/itemActions';

function mapStateToProps(store) {
  return { 
    items: store.items.items || [],
    fetched: store.items.fetched,
    fetching: store.items.fetching,
  };
}

class ItemsDropdown extends React.Component {
  
  componentWillMount(){
    if(!this.props.fetched && !this.props.fetching)
      this.props.dispatch(fetchItems());
  }
  
  render(){
      const { items, name, input, filter, itemId } = this.props;
      
      const Options = items.filter((item)=>{
        if(filter)
          return item.set === filter || item._id === itemId
        return true
      })
      .map((item, index)=>{
        return (
          <option value={item._id} key={item._id}> {item.number} - {item.name}</option>
        );
      });
      
      return (
        
        <div className={`input-group`}>
          
          <span className="input-group-btn">
            <button className="btn btn-danger btn-lg-remove" type="button" onClick={this.props.onClick}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </span>
          
          <Field {...input} name={name} component="select" className="form-control">
            <option value="">-- Choose Item --</option>
            {Options}
          </Field>
          
        </div>
        
      );  
  };
}

export default connect(mapStateToProps)(ItemsDropdown);