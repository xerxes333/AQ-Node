import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './Layout';
import Content from './Content';
import Campaigns from './pages/Campaigns';
import Guilds from './pages/Guilds';
import Heroes from './pages/Heroes';
import Items from './pages/Items';
import FAQ from './pages/FAQ';


import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Content}></IndexRoute>
      <Route path="campaigns(/:id)" component={Campaigns}></Route>
      <Route path="guilds" component={Guilds}></Route>
      <Route path="heroes" component={Heroes}></Route>
      <Route path="items" component={Items}></Route>
      <Route path="faq" component={FAQ}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
