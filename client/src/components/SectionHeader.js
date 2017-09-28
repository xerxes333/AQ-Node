import React from "react";
import { Link } from 'react-router';

class SectionHeader extends React.Component {
  
  render() {
    const { name, create, filter } = this.props
    const nameLC = name.toLowerCase()
    
    let titleSpan  = "col-md-2"
    let filterSpan = "col-md-2"
    let createSpan = "col-md-2"
    
    if(filter && create){
      titleSpan  = "col-md-6"
      filterSpan = "col-md-4"
      createSpan = "col-md-2"
    } else if(filter){
      titleSpan  = "col-md-8"
      filterSpan = "col-md-4"
      createSpan = ""
    } else if(create){
      titleSpan  = "col-md-10"
      filterSpan = ""
      createSpan = "col-md-2"
    } else {
      titleSpan  = "col-md-12"
      filterSpan = ""
      createSpan = ""
    }
    
    return(
      <div className="row header-row text-center-xs"> 
       
        <div className={`${titleSpan} col-xs-12`}> 
          <h2>{name}</h2>
        </div>
        
        {filter && 
        <div className={`${filterSpan} col-xs-12 text-center`}> 
            {this.props.children}
        </div>
        }
        
        {create && 
        <div className={`${createSpan} col-xs-12 header-row-buttons`}> 
          <Link to={`/${nameLC}/new`} className={`btn btn-primary btn-block`}>
            <span className="glyphicon glyphicon-plus-sign"></span>New
          </Link>
        </div>
        }
         
       </div>
    )
  }
}

export default SectionHeader;
