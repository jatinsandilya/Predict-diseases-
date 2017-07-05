import React, { Component } from 'react';
import {Editors} from 'react-data-grid-addons';
import GridComponent from './GridComponent';
import ReactDOM from 'react-dom';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import AddPatientDetailsContainer from '../containers/AddPatientDetailsContainer';
const { DropDownEditor } = Editors;
import PaginationComponent from '../../ui/components/pagination/PaginationComponent';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
 const assigned_physician=[];
import ConfirmModal from '../containers/ConfirmModalContainer';

class PatientDetailsComponent extends Component {
  constructor(props) {
    super(props);
		this.showPatientModal=this.props.showPatientModal.bind(this);
		 
		 this.patientToolbarConfig={
			 		name:"patient details",
					actions:{
						add:this.props.showPatientModal,
						edit:this.props.showPatientModal,
						delete:this.props.showConfirmPatientModal,
						upload:this.props.openTemplatePatientModal
					 }
				}
		console.log(this.patientToolbarConfig)		
		this.selectedPatientIndexes=[];

		this.columns=[
										{
											"key": "name",
											"name": "Patient’s Name",
										resizable: true,
										width: 170,
										},
										{
											"key": "patient_since",
											"name": "Patient Since",
											resizable: true,width: 125,
										},
										{
											"key": "gender",
											"name": "Gender",
											resizable: true,width: 79,
										},
										{
											"key": "age",
											"name": "Age",
										resizable: true,width: 53,
										},
										{
											"key": "location",
											"name": "Location",
											resizable: true,width: 115,
										},
										{
											"key": "height",
											"name": "Height",
										resizable: true,width: 80,
										},
										{
											"key": "martial_status",
											"name": "Marital Status",
											resizable: true,width: 134,
										},
										{
											"key": "race",
											"name": "Race",
											resizable: true,width: 80,
										},
										{
											"key": "id",
											"name": "Assigned Physician",
											resizable: true,width: 190,
											getRowMetaData: (row) => row,
                                            formatter:((value) => this.getDropdown(value, this.props.assignedPhysicians))
                                        }
								];
		
}
onSelectPhysician(rowValue, event){
	console.log('selected', event);
	var physician = event.target.value;
	this.props.updatePatientsAssignedPhysician(rowValue, physician);
}

getDropdown(rowValue, source){
	if(!source || !source.length){ 
		return null ;
	}
  	var options = source.map((item)=>{
  		return <option key={item.value}  value={item.value}>{item.name}</option>

    });
	var ddl = <FormGroup controlId="formControlsSelect"  >
		<FormControl  value={rowValue.dependentValues.assigned_physician_id}	componentClass="select" placeholder="select" onChange={this.onSelectPhysician.bind(this, rowValue.dependentValues)} >
			<option key="select" value="select">select</option>
			{options}
		</FormControl>
	</FormGroup>
	return ddl;
}

  componentDidMount() {
		this.props.loadAssignedPhysicians();
  }
  close() {		
		this.closePatientModal();
  }

  open() {
		this.showPatientModal();
  }

  openConfirm() {
	this.props.showConfirmPatientModal();
  }
  
  closeConfirm() {		
	this.props.closePatientConfirmModal();
  }

  openTemplatePatientModal(){
	  this.props.openTemplatePatientModal();
  }

  onConfirmDel(){
	this.props.patientRecordDelConfirm(this.props.selectedPatientDetailsRow);
  }

  render() {
    return (
      <section className="dashboard-right-bg-box">
			<div className="container-fluid">
				<div className="dashboard-right-bg-shadow">
					<div className="row">
						<div className="col-md-12">
							<h4 className="db-table-title">Patient’s Details </h4>
							{this.props.patientDelConfrimModal&&
								<ModalContainer id="confirmDeleteModal" onClose={this.closeConfirm.bind(this)}>
											<ModalDialog onClose={this.closeConfirm.bind(this)}>
												<ConfirmModal 
													title="Confirm"
													msgText="Would you like to remove selected records from the list?"
													onClose={this.closeConfirm.bind(this)}
													onYes={this.onConfirmDel.bind(this)}
												 />
											</ModalDialog>
								</ModalContainer>}
						</div>
					</div>	
					<div className="row">
					<div className="col-md-12">
							<div className="table-responsive subsc-table">
									<GridComponent  
									rows={this.props.patientDetails.rows} 
									columns={this.columns} 
									toolbarConfig={this.patientToolbarConfig}
									handleGridRowsUpdated={this.props.handleGridRowsUpdated}
									onRowsSelected={this.props.onPatientRowSelect}
									onRowsDeselected={this.props.onPatientRowDeSelect}
									selectedIndexes={this.selectedPatientIndexes}
									minHeight={395}
									rowHeight={45}
									selectedRows={this.props.selectedPatientDetailsRow}
									/>
											<div className="pull-right">
												<PaginationComponent
											items={this.props.patientDetails.rows?this.props.patientDetails.rows.length:1}
											totalItems={10}
										    maxShowItem={10}
										  	handleSelect={this.props.onPatientPageSelect}
											loadDataByPagination = {this.props.loadPatientData}
											/>
											</div>
							</div>
							</div>
					</div>
				</div>
			</div>
		</section>
    );
  }
}

export default PatientDetailsComponent;