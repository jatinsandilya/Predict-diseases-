import { combineReducers } from 'redux'

import appAuthenticateReducer from './app/authenticate/reducers';
import subscriptionReducer from './app/core/reducers/subscriptionReducer';
import sharedReducers from './app/core/reducers/sharedReducers';

const reducers = combineReducers({
	auth : appAuthenticateReducer,
	subscription:subscriptionReducer,
	shared:sharedReducers
});

export default reducers;
