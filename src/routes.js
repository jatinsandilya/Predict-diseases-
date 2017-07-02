import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import PatientDashboard from './components/PatientDashboard'
import Home from './components/Home'
// import AppSubscriptionContainer from './legacy/app/core/components/AppSubscriptionContainer'
import AppLoginComponent from './legacy/app/authenticate/components/login/AppLoginComponent'
import AppSignupComponent from './legacy/app/authenticate/components/signup/AppSignupComponent'
import App from './App';
import AuthRoute from './legacy/app/authenticate/routes';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={App}> 
        <IndexRoute component={PatientDashboard}/>
        <Route path="home" component={Home}/>
        {AuthRoute()}
      </Route>
    </Router>
  );
};

export default Routes;