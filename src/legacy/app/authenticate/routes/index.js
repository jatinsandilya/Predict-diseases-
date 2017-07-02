'use strict'

import React from 'react'
import { Route, IndexRoute } from 'react-router'

import AuthLayout from '../layouts';
import AppLoginContainer from '../containers/AppLoginContainer.js';
import AppSignupContainer from '../containers/AppSignupContainer.js';
import AppSubscriptionContainer from '../../core/containers/AppSubscriptionContainer.js';
import * as AuthService from '../../../services/auth';

export default function () {
	//<IndexRoute component={AppLoginContainer} />
	//<Route path='signup' component={AppSignupContainer} onEnter={AuthService.isLoggedIn}/>
	return (
		<Route component={AuthLayout}>			
			<Route path='login' component={AppLoginContainer} onEnter={AuthService.isLoggedIn}/>
			<Route path='subscription' component={AppSubscriptionContainer} onEnter={AuthService.isAuthRouter}/>
		</Route>
	)
}
