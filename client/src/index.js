import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import Layout from './Layout';
import Welcome from './Welcome';
import Campaigns from './components/Campaigns';
import Campaign from './components/Campaign';
import CampaignCreate from './components/CampaignCreate';
import Guilds from './components/Guilds';
import Guild from './components/Guild';
import GuildCreate from './components/GuildCreate';
import Heroes from './components/Heroes';
import Pets from './components/Pets';
import Items from './components/ItemsTable';
import Login from './components/Login';
import Join from './components/Join';
import Profile from './components/Profile';
import { requireAuthentication } from './components/AuthenticatedComponent';

// import './index.css';
import store from "./store";

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory} onUpdate={()=>{window.scrollTo(0,0)}}>
    <Route path="/" component={Layout}>
    
      <IndexRoute component={Welcome}></IndexRoute>
      
      <Route path="campaigns" component={requireAuthentication(Campaigns)}/>
      <Route path="campaigns/new" component={requireAuthentication(CampaignCreate)}/>
      <Route path="campaigns/:id" component={requireAuthentication(Campaign)}/>
      <Route path="campaigns/:id" component={requireAuthentication(Campaign)}/>
      
      <Route path="guilds" component={requireAuthentication(Guilds)}/>
      <Route path="guilds/new" component={requireAuthentication(GuildCreate)}/>
      <Route path="guilds/:id" component={requireAuthentication(Guild)}/>
      <Route path="guild/:id" component={requireAuthentication(Guild)}/>
      
      <Route path="heroes" component={Heroes}></Route>
      <Route path="pets" component={Pets}></Route>
      <Route path="items" component={Items}></Route>
      
      <Route path="profile" component={requireAuthentication(Profile)}/>
      <Route path="login" component={Login}></Route>
      <Route path="logout" component={Login}></Route>
      <Route path="join" component={Join}></Route>
      
      <Route name="404: No Match for route" path="*" component={Welcome}/>
    </Route>
    
  </Router>
  </Provider>,
  root
);
