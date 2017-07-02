'use strict'

import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import axios from 'axios';
import reducers from './reducers.js'

const checkToken =  (store) => (next) => (action) => {
	axios.defaults.headers.common['Authorization'] = store.getState().auth.token ? 'Bearer ' + store.getState().auth.token : null;
	return next(action);
}

const middlewares = applyMiddleware(checkToken, thunk, logger);


const store = createStore(reducers, middlewares);

export default store
