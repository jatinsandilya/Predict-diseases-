import React, { Component } from 'react';

import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import modalConductor from '../../../services/modalConductor';

// import ConfirmModal from '../containers/ConfirmModalContainer';
// import ImportExportModal from '../components/ImportExportModal';
// import AddTeamDetailsContainer from '../containers/AddTeamDetailsContainer';
// import AddPatientDetailsContainer from '../containers/AddPatientDetailsContainer';


class ModalWrapper extends Component {
    constructor(props) {
        super(props);
        this.closeModal=this.props.closeModal.bind(this);
        this.patientRecordDelConfirm = this.props.patientRecordDelConfirm.bind(this);
        this.closePatientConfirmModal= this.props.closePatientConfirmModal.bind(this);
    }
  render() {
   return (
            this.props.currentModal &&
                <ModalContainer onClose={this.close.bind(this)} >
                    <ModalDialog onClose={this.close.bind(this)}>
                        {this.GetModalContent()}
                    </ModalDialog>
                </ModalContainer>  
            );
  }

GetModalContent(){
     return modalConductor(this.props);
    // switch (this.props.currentModal) {
    //     case 'TEAM_MODAL':
    //        return <AddTeamDetailsContainer data={this.props.teamDetailsModalData} />
    //     break; 
    //     case 'PATIENT_MODAL':
    //        return <AddPatientDetailsContainer data={this.props.patientDetailsModalData} />
    //     break;
    //     case 'TEMPLATE_EXCEL_MODAL':
    //        return <ImportExportModal />
    //     break;
    //     case 'CONFIRM_MODAL':
    //         return <ConfirmModal title="Confirm" msgText="Would you like to remove selected records from the list?"	onClose={this.closeConfirm.bind(this)}	onYes={this.onConfirmDel.bind(this)} />
    //     break;
    //     break;   
    //}
}
   close() {		
		this.closeModal();
  }
  

}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(ModalWrapper);