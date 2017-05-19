import React from "react";
import { Link } from 'react-router';

class PrevNext extends React.Component {

  render() {

    const { type, all, current } = this.props
    
    var prev = null
    var next = null
    
    if (all.length > 0){
      
      const index = all.findIndex((obj,i)=>{
        return obj._id === current._id
      })
      
      if(index === -1)
        prev = next = null
      else if(index === 0)
        next = all[index + 1]._id
      else if(index === all.length - 1)
        prev = all[index - 1]._id
      else {
        prev = all[index - 1]._id
        next = all[index + 1]._id
      }
      
    }
    
    return (
      <nav aria-label="...">
        <ul className="pager">
        
          {prev && 
            <li className="previous">
              <Link to={`/${type}/${prev}`}>
                <span aria-hidden="true" className="glyphicon glyphicon-chevron-left"> </span> Prev
              </Link>
            </li> 
          }
          
          {next && 
            <li className="next">
              <Link to={`/${type}/${next}`}>
                Next <span aria-hidden="true" className="glyphicon glyphicon-chevron-right"></span>
              </Link>
            </li> 
          }
        </ul>
      </nav>
    )
  };
}

export default PrevNext;
