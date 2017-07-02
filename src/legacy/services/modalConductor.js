import React, { Component } from 'react';
import ConfirmModal from '../app/core/containers/ConfirmModalContainer';
import ImportExportModal from '../app/core/components/ImportExportModal';
import AddTeamDetailsContainer from '../app/core/containers/AddTeamDetailsContainer';
import AddPatientDetailsContainer from '../app/core/containers/AddPatientDetailsContainer';


export default function modalConductor(props) {
        switch (props.currentModal) {
        case 'TEAM_MODAL':
           return <AddTeamDetailsContainer data={props.teamDetailsModalData} />
        break; 
        case 'PATIENT_MODAL':
           return <AddPatientDetailsContainer data={props.patientDetailsModalData} />
        break;
        case 'TEMPLATE_EXCEL_MODAL':
           return <ImportExportModal />
        break;
        case 'CONFIRM_MODAL':
            return <ConfirmModal title="Confirm" msgText="Would you like to remove selected records from the list?"	onClose={props.closeModal}	onYes={props.patientRecordDelConfirm(props.selectedPatientDetailsRow)} />
        break;
        break;   
    }
}

// onConfirmDel() {
// 	this.props.patientRecordDelConfirm(this.props.selectedPatientDetailsRow);
//   }
  
//   closeConfirm() {		
// 	this.props.closePatientConfirmModal();
//   }