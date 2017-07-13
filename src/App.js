import React, { Component } from 'react';
import PDHeader from './components/Header';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <PDHeader />
        {this.props.children}
      </div>
    );
  }
}
