'use strict';

import React, { Component } from 'react';

import AddTeamDetailsComponent from '../components/AddTeamDetailsComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addTeamDetails } from '../actions/AddTeamDetails';

class AddTeamDetailsContainer extends Component {
  render() {
    return (
      <AddTeamDetailsComponent 
        addTeamDetails={this.props.addTeamDetails}
        selectedTeamDetailsRow={this.props.data}
      />
    );
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
       addTeamDetails: addTeamDetails       
	}, dispatch);
}

var mapStateToProps = function(state){
return {      
  selectedTeamDetailsRow:state.subscription.selectedTeamDetailsRow
}
};

export default connect(mapStateToProps, matchDispatchToProps)(AddTeamDetailsContainer);