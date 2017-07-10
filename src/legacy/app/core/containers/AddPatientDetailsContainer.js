import React, { Component } from 'react';

import AddPatientDetailsComponent from '../components/AddPatientDetailsComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPatientDetails } from '../actions/AddPatientDetails';;


class AddPatientDetailsContainer extends Component {
  render() {
    return (
      <AddPatientDetailsComponent 
        addPatientDetails={this.props.addPatientDetails}        
        selectedPatientDetailsRow={this.props.data}
      />
    );
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
    addPatientDetails:addPatientDetails
	}, dispatch);
}

var mapStateToProps = function(state)
{
return{
  selectedPatientDetailsRow:state.subscription.selectedPatientDetailsRow
}
};

export default connect(mapStateToProps, matchDispatchToProps)(AddPatientDetailsContainer);