
import './public/stylesheets/css/main.css';

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './public/stylesheets/css/main.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';

injectTapEventPlugin();


ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
)