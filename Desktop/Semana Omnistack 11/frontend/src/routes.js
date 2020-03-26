import React from 'react';

import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function src() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Logon}/>
        <Route path="/register" component={Register}/>
        <PrivateRoute exact path="/profile" component={Profile}/>
        <PrivateRoute path="/incidents/new" component={NewIncident}/>
      </Switch>
    </Router>
  );
}
