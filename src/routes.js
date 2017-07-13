import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import Home from './components/Home'
import AuthRoute from './legacy/app/authenticate/routes';

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/'>
        <Route path="home" component={Home}/>
        {AuthRoute()}
      </Route>
    </Router>
  );
};

export default Routes;
