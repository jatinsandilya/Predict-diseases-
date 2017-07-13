'use strict';

import React, { Component } from 'react';

import { gridAction, handleGridRowsUpdated } from '../actions/GridAction';
import GridComponent from '../components/GridComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GridContainer extends Component {
	constructor(props){
		super(props);
		this.handleGridRowsUpdated = this.props.handleGridRowsUpdated.bind(this);
	}
	render() {
		return (
			<GridComponent 
			gridAction={this.props.gridAction} 
			handleGridRowsUpdated={this.handleGridRowsUpdated} />
		);
	}
}


function matchDispatchToProps(dispatch) {
	return bindActionCreators({
      gridAction: gridAction,
	  handleGridRowsUpdated:handleGridRowsUpdated
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(GridContainer);
