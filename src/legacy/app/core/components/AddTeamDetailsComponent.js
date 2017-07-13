import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import toastr from 'toastr';
import Dropzone from 'react-dropzone';
import toImageUrl from '../../../services/convertBase64';
var filesData={files:[]};

export default class AddTeamDetailsComponent extends Component{

constructor(props, context) {
        super(props, context);			
				filesData = {
            files: []
        };
        console.log("In AddTeamDetailsComp.js",this.props);
    }

		onDrop(files) {
				filesData.files=files;
					toImageUrl(files[0].preview, function(base64Img) {
					document.getElementById('teamThumbnail').src = base64Img;
					document.getElementById('teamAvtar').value = base64Img;
				});
    }

		setDefaultVal(fieldName){
			if(this.actionType==='edit' && this.editTeamData){
				return this.editTeamData[fieldName];
			}else{
				return "";
			}
		}

  render(){
		
		this.actionType=this.props.selectedTeamDetailsRow.action;
		if( this.props.selectedTeamDetailsRow && this.actionType === 'edit'){
			if(this.props.selectedTeamDetailsRow.selectedTeamDetailsRow){
				this.editTeamData=this.props.selectedTeamDetailsRow.selectedTeamDetailsRow[0].row;
			}
		}

		var modalCalWidth = window.innerWidth/1.5;
    return(
      <section className="dashboard-right-bg-box subs_form">				
			<div className="container-fluid" style={{width : modalCalWidth}}>
				<div className="dashboard-right-bg-shadow">
					<div className="row">
						<div className="col-md-12">
							<h4 className="db-r-form-title">Team Details</h4>
						</div>
					</div>
					<div className="row">
						<form  onSubmit={this.handleTeamDetailsSubmit.bind(this)}>
						<div className="col-md-3 col-sm-4 center">							
                <Dropzone onDrop={this.onDrop.bind(this)}
                          ref="dropzone"
                          style={{display: 'inline-block'}}>
										<img id="teamThumbnail" alt="Team Thumbnail" className="img-responsive avtar-thumbnai" ref="dropzoneThumbnail" src="images/upload-btn.jpg" />
										<input id="teamAvtar" ref="teamAvtar" type="hidden" />
                </Dropzone><div>
								{/*<a onClick={this.openAfter.bind(this)} className="btn choose_btn">Import File</a>*/}
								</div>
						</div>

						<div className="col-md-9 col-sm-8">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Team Name (Job Title)</label>
									  <input type="text" className="form-control" defaultValue={this.setDefaultVal('name')} id="name" ref="name"/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
									  <label >Age</label>
									  <input type="text" className="form-control" id="age" ref="age" defaultValue={this.setDefaultVal('age')}/>
									</div>
								</div>
							</div>
              <div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Nickname</label>
									  <input type="text" className="form-control" id="nickname" ref="nickname" defaultValue={this.setDefaultVal('nickname')}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
									  <label >Employee</label>
									  <input type="text" className="form-control" id="employee" ref="employee"  defaultValue={this.setDefaultVal('employee')}/>
									</div>
								</div>
							</div>
              <div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Speciality</label>
									  <input type="text" className="form-control" id="speciality" ref="speciality"  defaultValue={this.setDefaultVal('speciality')}/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
									  <label >Phone Number</label>
									  <input type="text" className="form-control" id="phone" ref="phone"  defaultValue={this.setDefaultVal('phone')}/>
									</div>
								</div>
							</div>
              <div className="row">
								<div className="col-md-6">
									<div className="form-group">
									  <label >Email</label>
									  <input type="text" className="form-control" id="email" ref="email"  defaultValue={this.setDefaultVal('email')}/>
									</div>
								</div>								
							</div>
              <div className="row">
								<div className="col-md-12">
									<button type="submit" className="btn db-table-btn">
											{(this.actionType === 'edit')?"Update Team Member":"Add Team Member"}
										</button>
								</div>
							</div>
						</div>
						</form>
					</div>
				</div>
			</div>
		</section>
    )
  }

handleTeamDetailsSubmit(event) {
    const thisObj = this;
    event.preventDefault();

    const name = ReactDOM.findDOMNode(thisObj.refs.name).value.trim();
		const age = ReactDOM.findDOMNode(thisObj.refs.age).value.trim();
		const nickname = ReactDOM.findDOMNode(thisObj.refs.nickname).value.trim();
		const employee = ReactDOM.findDOMNode(thisObj.refs.employee).value.trim();
		const speciality = ReactDOM.findDOMNode(thisObj.refs.speciality).value.trim();
		const phone = ReactDOM.findDOMNode(thisObj.refs.phone).value.trim();
		const email = ReactDOM.findDOMNode(thisObj.refs.email).value.trim();
		const organisation_id = 1;
		const upload_picture = ReactDOM.findDOMNode(thisObj.refs.teamAvtar).value;;
		
		//validation

    // create a user object
    const team_info = {
      name,
      age,
			nickname,
			employee,
			speciality,
			phone,
			email,
			upload_picture,
			organisation_id
    };
		var queryData={};
		if(this.props.selectedTeamDetailsRow.action === 'edit'){
			console.log("DEBUG!!: \n",this.props.selectedTeamDetailsRow.selectedTeamDetailsRow[0].row.physician_id);
			queryData={team_info:team_info, physician_id : this.props.selectedTeamDetailsRow.selectedTeamDetailsRow[0].row.physician_id};
		}
		else{
			queryData={team_info:team_info};
		}
    $('#spinner').css({'display': ''});

    this.props.addTeamDetails(queryData, function (err, res) {
       $('#spinner').css({'display': 'none'});
      if (err) {
        toastr.error(err||'Request Failed');
      } else {
        toastr.success(res.message||"Requested successfully.");
       
			}
    });
  }
}
