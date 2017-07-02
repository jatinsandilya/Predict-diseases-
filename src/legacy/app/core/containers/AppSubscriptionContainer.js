'use strict';

import React, { Component } from 'react';
import { appSubscription, 
  handleGridRowsUpdated,
  teamHandleGridRowsUpdated,  
  loadTeamData,
  onTeamPageSelect,
  showTeamModal, 
  closeTeamModal,
  showConfirmModal,
  closeConfirmModal,
  showPatientModal,
  closePatientModal,
  closeModal,
  loadPatientData,
  onPatientPageSelect,
  onPatientRowSelect,
  onPatientRowDeSelect,
  onTeamRowSelect,
  onTeamRowDeSelect  ,
  deleteTeamRows,
  deletePatientRows, 
  updatePatientsAssignedPhysician,
  loadAssignedPhysicians,
  teamRecordDelConfirm,
  patientRecordDelConfirm,
  showConfirmPatientModal,
  closePatientConfirmModal,
  openTemplateModal,
  openTemplatePatientModal,
  closeTemplateModal
 } from '../actions/AppSubscriptionAction.js';

import AppSubscriptionComponent from '../components/AppSubscriptionComponent.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class AppSubscriptionContainer extends Component {
  constructor(props){
    super(props);
  }
  render() {    
    return (
      <AppSubscriptionComponent {...this.props}/>
    );
  }
  componentDidMount() {
  }
}

//methods
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    appSubscription: appSubscription,
    loadPatientData: loadPatientData,
    loadTeamData: loadTeamData,
    handleGridRowsUpdated: handleGridRowsUpdated,
    teamHandleGridRowsUpdated: teamHandleGridRowsUpdated,
    showTeamModal: showTeamModal,
    closeTeamModal: closeTeamModal,
    closeConfirmModal: closeConfirmModal,
    closePatientConfirmModal:closePatientConfirmModal,
    showConfirmModal: showConfirmModal,
    showConfirmPatientModal:showConfirmPatientModal,
    showPatientModal: showPatientModal,
    closePatientModal: closePatientModal,
    closeModal:closeModal,
    onTeamPageSelect: onTeamPageSelect,
    onPatientPageSelect : onPatientPageSelect,
    onPatientRowSelect : onPatientRowSelect,
    onPatientRowDeSelect : onPatientRowDeSelect,
    onTeamRowSelect : onTeamRowSelect,
    onTeamRowDeSelect : onTeamRowDeSelect, 
    deleteTeamRows: deleteTeamRows, 
    deletePatientRows: deletePatientRows,
    loadAssignedPhysicians: loadAssignedPhysicians,
    updatePatientsAssignedPhysician: updatePatientsAssignedPhysician,
    teamRecordDelConfirm:teamRecordDelConfirm,
    patientRecordDelConfirm:patientRecordDelConfirm,
    //openTemplateModal:openTemplateModal,
    openTemplatePatientModal:openTemplatePatientModal,
    closeTemplateModal:closeTemplateModal
  }, dispatch);
}

//properties
var mapStateToProps = function(state){
    return {      
      teamDetails:state.subscription.teamDetails || {},
      teamDetailsModalData:state.subscription.teamDetailsModalData,
      patientDetails:state.subscription.patientDetails || {},
      patientDetailsModalData:state.subscription.patientDetailsModalData, 
      teamDelConfrimModal:state.subscription.teamDelConfrimModal||false,
      patientDelConfrimModal:state.subscription.patientDelConfrimModal||false,
      teamImportShowModal:state.subscription.teamImportShowModal||false,
      assignedPhysicians:state.subscription.assignedPhysicians,
      selectedTeamDetailsRow:state.subscription.selectedTeamDetailsRow,
      selectedPatientDetailsRow:state.subscription.selectedPatientDetailsRow
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(AppSubscriptionContainer);
