import React from 'react'
import { Link } from 'react-router'

class Breadcrumbs extends React.Component {
  
  render() {
    
    const path = this.props.path || window.location.pathname
    const pathArray = path.split("/")
    var to = "";
    
    const list = pathArray.map((stone, index)=>{
      if(stone === "") // Home
        return <li key={index}><Link to="/">Home</Link></li>
      if(index === pathArray.length-1) // Last stone
        return <li key={index} className="active">{stone}</li>
      return <li key={index}><Link to={(to += "/" + stone)}>{stone}</Link></li>
    })

    return (
      <div className="row">
        <div className="col-md-12 col-xs-12">
          <ol className="breadcrumb">
            {list}
          </ol>
        </div>
      </div>
    )
    
  }
  
}

export default Breadcrumbs;