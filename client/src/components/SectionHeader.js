import React from "react";
import { Link } from 'react-router';

class SectionHeader extends React.Component {
  
  render() {
    const { name, create } = this.props
    const nameLC = name.toLowerCase()
    
    return(
      <div className="row header-row text-center-xs"> 
       
        <div className="col-md-2 col-xs-12"> 
          <h2>{name}</h2>
        </div>
         
        {create && 
        <div className="col-md-2 col-xs-12 header-row-btns"> 
          <Link to={`/${nameLC}/new`} className={`btn btn-primary new-${nameLC} btn-lg-mobile`}>
            <span className="glyphicon glyphicon-plus-sign"></span>New
          </Link>
        </div>
        }
         
       </div>
    )
  }
}

export default SectionHeader;
