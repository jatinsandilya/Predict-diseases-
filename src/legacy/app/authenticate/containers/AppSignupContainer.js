'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appSignup } from '../actions/AppSignup.js';
import AppSignupComponent from '../components/signup/AppSignupComponent.js';

class AppLoginContainer extends Component {
  render() {
    return (
      <AppSignupComponent appSignup={this.props.appSignup} />
    );
  }
}


function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    appSignup: appSignup
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(AppLoginContainer);
