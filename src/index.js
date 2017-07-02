import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

// import configureStore from './stores/configureStore'; // does not do anything as such
import Routes from './routes';
import store from './legacy/store';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

// const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
