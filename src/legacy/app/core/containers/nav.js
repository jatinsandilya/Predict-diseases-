'use strict'

import React, { Component } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import 'bootstrap/dist/js/bootstrap.min'
import NavComponent from '../components/nav.js';
import  {logoutHard} from '../../authenticate/actions/logout';


class NavContainer extends Component {
	constructor() {
		super();
		this.logout = this.logout.bind(this);
	}

	componentWillMount(){
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('access_token');
		localStorage.removeItem('email');
		localStorage.removeItem('user_role');
		localStorage.removeItem('name');
		localStorage.removeItem('status');
		localStorage.removeItem('user_id');
		this.props.logoutHard();
	}
	settings() {
		toastr.success('roadmap feature...');
	}
	render() {
		return(
			<NavComponent
				auth={this.props.auth}
				logout={this.logout}
				settings={this.settings}
			/>
		);
	}
}

function mapStateToProps (store) {
	return {
		auth: store.auth
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutHard : logoutHard
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps , null,{
  pure: false
})(NavContainer);
