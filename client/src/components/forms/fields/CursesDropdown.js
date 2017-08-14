import React from "react";
import { connect } from "react-redux";
import { Field } from 'redux-form';

import { fetchCurses } from '../../../actions/curseActions';

function mapStateToProps(store) {
  return { 
    curses: store.curses.curses || [],
    fetched: store.curses.fetched,
    fetching: store.curses.fetching,
  };
}

class CursesDropdown extends React.Component {
  
  componentWillMount(){
    if(!this.props.fetched && !this.props.fetching)
      this.props.dispatch(fetchCurses());
  }
  
  render(){
      const { curses, name, input, filter, curseId } = this.props;

      const Options = curses.filter((curse, i)=>{
        if(filter)
          return curse.set === filter || curse._id === curseId
        return true
      })
      .map((curse, index)=>{
        return (
          <option value={curse._id} key={curse._id}> {curse.number} - {curse.name}</option>
        );
      });
      
    return (
      <div className="form-group">
      
        <div className="input-group input-group-lg-mobile">
          <span className="input-group-btn">
            <button className="btn btn-danger" type="button" onClick={this.props.onClick}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>
          </span>
          
          <Field {...input} name={name} component="select" className="form-control">
            <option value="">-- Choose Curse --</option>
            {Options}
          </Field>
          
        </div>
          
      </div>
    )
    
  };
}

export default connect(mapStateToProps)(CursesDropdown);