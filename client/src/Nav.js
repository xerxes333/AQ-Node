import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {
 render() {
    return (
       <nav className="navbar-inverse navbar-fixed-top navbar" id="w0" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#w0-collapse">
                <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">AQ Guild Manager</Link>
          </div>
          <div className="collapse navbar-collapse" id="w0-collapse">
            <ul className="navbar-nav navbar-right nav" id="w1">
              <li><Link to="campaigns">Campaigns</Link></li>
              <li><Link to="guilds">Guilds</Link></li>
              <li><Link to="heroes">Heroes</Link></li>
              <li><Link to="items">Items</Link></li>
              <li><Link to="faq">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </nav>
  );
 }
 
}

export default Nav;