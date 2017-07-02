'use strict'
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalWrapper from '../../core/containers/ModalWrapper.js'
import {
  closeModal,
	patientRecordDelConfirm,
	closePatientConfirmModal
 } from '../../core/actions/AppSubscriptionAction.js';
class AppAuthLayout extends Component {
	constructor(props) {
    super(props);
	} 
	
	render() {
		return (
			<div> 
				{this.props.children}	
				<ModalWrapper {... this.props} />
			</div>
		)
	}
}

AppAuthLayout.propTypes = {
	children: PropTypes.element.isRequired
}

var mapStateToProps = function(state){
    return {      
      currentModal:state.shared.modalInstance.currentModal,
	  	teamDetailsModalData:state.subscription.teamDetailsModalData,
      patientDetailsModalData:state.subscription.patientDetailsModalData, 
			selectedPatientDetailsRow:state.subscription.selectedPatientDetailsRow
    };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal:closeModal,
		patientRecordDelConfirm:patientRecordDelConfirm,
		closePatientConfirmModal:closePatientConfirmModal
  }, dispatch);
};

export default connect(mapStateToProps,matchDispatchToProps)(AppAuthLayout);