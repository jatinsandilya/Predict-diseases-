import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { appLogin } from '../actions/AppLogin.js';
import AppLoginComponent from '../components/login/AppLoginComponent.js';

class AppLoginContainer extends Component {
	render() {
		return (
			<AppLoginComponent appLogin={this.props.appLogin} />
		);
	}
}


function matchDispatchToProps(dispatch) {
	return bindActionCreators({
      appLogin: appLogin
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(AppLoginContainer);
