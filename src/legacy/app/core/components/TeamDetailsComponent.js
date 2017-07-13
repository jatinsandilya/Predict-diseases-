import React, { Component } from 'react';

import GridComponent from './GridComponent';
import TeamMemUploadImage from './TeamMemUploadImage';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import PaginationComponent from '../../ui/components/pagination/PaginationComponent';
import ConfirmModal from '../containers/ConfirmModalContainer';

class TeamDetailsComponent extends Component {
	constructor(props) {		
    super(props);
		 this.showTeamModal=this.props.showTeamModal.bind(this);		 
		 this.closeConfirmModal=this.props.closeConfirmModal.bind(this);
		 this.showConfirmModal=this.props.showConfirmModal.bind(this);
		 this.selectedTeamIndexes=[];	 
		 this.columns=[
				{
					"key": "name",
					"name": "Name (Job Title)",
					resizable: true,
					width: 170,
				},
				{
					"key": "age",
					"name": "Age",
					resizable: true,
					width: 60,
				},
				{
					"key": "nickname",
					"name": "Nickname",
					resizable: true,
					width: 115,
				},
				{
					"key": "employee",
					"name": "Employee",
					resizable: true,
					width: 115,
				},
				{
					"key": "speciality",
					"name": "Speciality",
					resizable: true,
					width: 115,
				},
				{
					"key": "phone",
					"name": "Phone",
					resizable: true,
					width: 115,
				},
				{
					"key": "email",
					"name": "E-Mail",
					resizable: true,
					width: 159,
				},
				{
					"key": "upload_picture",
					"name": "Upload Picture",
					resizable: true,
					width: 120,
					formatter: ({value}) => <TeamMemUploadImage value={value} onUpload={this.onTeamUploadImage.bind(this)} />
				}];
  	
				this.teamToolbarConfig={
					name:"team details",
					actions:{
						add:this.props.showTeamModal,
						edit:this.props.showTeamModal,
						delete:this.props.showConfirmModal,
						upload:this.props.openTemplateModal
					}
				}
	}

	onTeamUploadImage(files,rowObj){
		// this.props.teamHandleGridRowsUpdated({files,rowObj});
	}

	getRow(rowNum){
				//helper
				// var react_grid_row_style={height: '35px',overflow: 'hidden',contain: 'layout'};
				// var react_grid_cell_style={position: 'absolute', width: '112px', height: '35px', left: '0px', contain: 'layout'};
				// 	return (<div className="react-grid-Row react-grid-Row--even" style={react_grid_row_style}>
				// 	{
				// 			this.props.teamDetails.columns.map((col,index) => {
				// 				if(col.key == 'upload_picture'){
				// 					return (<div key={index} className="react-grid-Cell react-grid-Cell-Custom" style={react_grid_cell_style}>
				// 							<div className="react-grid-Cell__value">
				// 							<span>
				// 							<Dropzone onDrop={this.onTeamUploadImage.bind(this,this.props.teamDetails.rows)}
				// 												ref="dropzone">
				// 								<a href="#">{this.props.teamDetails.rows[rowNum][col.key]}</a>
				// 							</Dropzone>
				// 						</span>
				// 						</div></div>)
				// 				}
				// 				else{
				// 					return (<div key={index} className="react-grid-Cell react-grid-Cell-Custom" style={react_grid_cell_style}>
				// 										<div className="react-grid-Cell__value">
				// 										<span>{this.props.teamDetails.rows[rowNum][col.key]}</span>
				// 									</div></div>);
				// 				}	
				// 	})
				// 		}
				// 		</div>);
	}

  close() {		
	this.closeTeamModal();
  }
  open() {
	this.showTeamModal();
  }
  closeConfirm() {		
	this.closeConfirmModal();
  }
  onConfirmDel(){
	this.props.teamRecordDelConfirm(this.props.selectedTeamDetailsRow);
  }
  openConfirm() {
		this.showConfirmModal();
  }  
  closeTemplateModal(){
	  this.props.closeTemplateModal();
  }
  render() {
		
    return (
      <section className="dashboard-right-bg-box">
				<div className="container-fluid">
					<div className="dashboard-right-bg-shadow">
						<div className="row">
							<div className="col-md-12">
								<h4 className="db-table-title">Team</h4>
								{this.props.teamDelConfrimModal&&
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
										rows={this.props.teamDetails.rows} 
										columns={this.columns} 
										toolbarConfig={this.teamToolbarConfig}									
										handleGridRowsUpdated={this.props.teamHandleGridRowsUpdated}
										onRowsSelected={this.props.onTeamRowSelect}
										onRowsDeselected={this.props.onTeamRowDeSelect}
										selectedIndexes={this.selectedTeamIndexes}
										minHeight={391}
										rowHeight={35}
										selectedRows={this.props.selectedTeamDetailsRow}
										{...this.props}
										/>
										<div className="pull-right">
											<PaginationComponent
										items={this.props.teamDetails.rows?this.props.teamDetails.rows.length:1}
										totalItems={15}
										maxShowItem={10}
										activePage={this.props.teamDetails.activePage}
										handleSelect={this.props.onTeamPageSelect}
										loadDataByPagination={this.props.loadTeamData}
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

export default TeamDetailsComponent;
