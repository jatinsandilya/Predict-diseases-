'use strict'

import React, {Component, PropTypes} from 'react'

import NavContainer from '../containers/nav.js';
import HomeNavContainer from '../components/homenav';
import FootComponent from '../components/footer';


class AppCoreLayout extends Component {
	render() {
		return (
			<div>
          {localStorage.getItem('token') ? <NavContainer/> :<HomeNavContainer/>}
				<div>
					{this.props.children}
				</div>
				<FootComponent/>
			</div>
		)
	}
}

AppCoreLayout.propTypes = {
	children: PropTypes.element.isRequired
};
export default AppCoreLayout
