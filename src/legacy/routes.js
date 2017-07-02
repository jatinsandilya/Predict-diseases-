'use strict';

import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppCoreLayout from './app/core/layouts'
import NotFoundComponent from './app/core/components/not-found'


import AuthRoute from './app/authenticate/routes';
import * as AuthService from './services/auth';

class Routes extends Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/clients/patientsweb">
                {AuthRoute()}
                </Route>
            </Router>
        );
    }
}

export default Routes;
