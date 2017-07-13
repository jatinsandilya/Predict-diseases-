import React, { Component } from 'react';


import $ from 'jquery';


import toastr from 'toastr';
import Dropzone from 'react-dropzone';
import PElements from '../../ui/components/PElements/PElements';
import PInput from '../../ui/components/PElements/PInput';
import {PRequired} from '../../ui/components/PElements/service/PValidators';
import Immutable from 'immutable';
import toImageUrl from '../../../services/convertBase64';

const activeStyle = {
};

const filesData={files:[]};

export default class AddOrgComponent extends Component{

constructor(props, context) {
        super(props, context);
				this.state={
      			errors:Immutable.Map(),
					selectedOrgRadio:"1"
    		}
		this.onValidationCheck=this.onValidationCheck.bind(this);
}

		onDrop(files) {
				filesData.files=files;
				toImageUrl(files[0].preview, function(base64Img) {
					document.getElementById('dropzoneThumbnail').src = base64Img;
					document.getElementById('orgAvtar').value = base64Img;
				});
    }

    onValidationCheck(elementId, isValid,validator){
        // var tmpObj=Immutable.Record({'purpose':'Showing Error'});
        var tmpObj={};
        var tmpkey=elementId;
        tmpObj[tmpkey]={};

        // tmpObj.set(tmpkey, Immutable.Record({'purpose':'Showing Error1'}))
        isValid = isValid && (!this.state.isValid || this.state.isValid)
        this.setState({isValid:isValid})

        if(!isValid){
            tmpObj[tmpkey][validator.key]={};
            Object.assign(tmpObj[tmpkey][validator.key],{errorMsg: validator.errorMsg})
            // var error = Immutable.Record(tmpObj);
            // var error = Immutable.Record(tmpObj);
            var error = Immutable.fromJS(tmpObj);
            // var errors = Object.assign({},error,this.state.errors);
            var er = this.state.errors.get(elementId);
            if(!er){
                var errors = this.state.errors.set(elementId, tmpObj[tmpkey]);
                this.setState({errors:errors});
            }else{
                this.state.errors.mergeIn([elementId], error)
            }

        }else{
            if(this.state.errors.get(elementId)){
                var errors = this.state.errors.deleteIn([elementId]);
                this.setState({errors:errors});

            }

            // var errors = Object.assign({},error,this.state.errors);
        }
        // this.setState({errors});
        //var error=Immutable.Immutable.Map({});

        //var errors=fromJS({});
        //error.set(element.props.id,error.get(element.props.id)||{});

        //error[element.props.id]=error[element.props.id]||{};
		/*
		 {
		 organisation_name :{
		 required:{
		 erroMsg:"reqiured!"
		 }
		 range:{errorMsg:"not in range"}
		 }
		 }
		 */
        //if(!element.state.isValid){
        //	debugger;
		/*var id=element.props.id;
		 error = Immutable.fromJS({});
		 error.setIn([element.props.id,validator.key],{
		 errorMsg:validator.errorMsg
		 })
		 console.log('error',error);*/
        //	debugger;
		/*var tmpEr=fromJS({});
		 tmpEr.set("errorMsg",validator.errorMsg);
		 tmpEr.set("key",validator.key);
		 var tmpValidator=fromJS({});
		 tmpValidator.set(validator.key,tmpEr);
		 error.set(element.props.id,tmpValidator);*/
        //error[element.props.id][validator.key]={errorMsg:validator.errorMsg,key:validator.key};
        //this.state.errors[element.props.id]=this.state.errors[element.props.id]||{};
        //this.state.errors[element.props.id][validator.key]=this.state.errors[element.props.id][validator.key]||{};
        //debugger;
        //errors = Object.assign({},
        //							error[element.props.id][validator.key],
        //						this.state.errors[element.props.id][validator.key]||{});
        //debugger;
        //	}else{
        //	error.set(element.props.id,Immutable.fromJS({}));
        //erros=error;
        //error[element.props.id]= {};
        //	errors = Object.assign({},error,this.state.errors);
        //	}
		/*var errors = Object.assign({},
		 error[element.props.id][validator.key],
		 this.state.errors[element.props.id][validator.key]||{});*/
        //this.setState({errors});
    }

	_onValidationCheck(element,validator){
				var error={};
				var errors={};
				error[element.props.id]=error[element.props.id]||{};
				if(!element.state.isValid){				
				error[element.props.id][validator.key]={errorMsg:validator.errorMsg,key:validator.key};
				this.state.errors[element.props.id]=this.state.errors[element.props.id]||{};
				this.state.errors[element.props.id][validator.key]=this.state.errors[element.props.id][validator.key]
				errors = Object.assign({},
																	error[element.props.id][validator.key],
																	this.state.errors[element.props.id][validator.key]||{});	
				}else{
					error[element.props.id]= {}; 
					errors = Object.assign({},error,this.state.errors);	
				}				
				/*var errors = Object.assign({},
																	error[element.props.id][validator.key],
																	this.state.errors[element.props.id][validator.key]||{});*/
				this.setState({errors});				
	}

	onChange(){
	}

  render(){
    return(
      <section className="dashboard-right-bg-box subs_form">
				
			<div className="container-fluid">
				<div className="dashboard-right-bg-shadow">
					<div className="row">
						<div className="col-md-12">
							<h4 className="db-r-form-title">Organisation Details</h4>
						</div>
					</div>
					<div className="row">
						<form  onSubmit={this.handleOrganisationSubmit.bind(this)}>
						<div className="col-sm-4 col-md-3 center">							
						<Dropzone onDrop={this.onDrop.bind(this)}
								ref="dropzone"
								style={{display: 'inline-block'}}
								activeStyle={activeStyle}>
								<img id="dropzoneThumbnail" className="img-responsive avtar-thumbnai" ref="dropzoneThumbnail" src="images/upload-btn.jpg" />
								<input id="orgAvtar" ref="orgAvtar" type="hidden"/>
						</Dropzone>
							{/*<div>
								<a onClick={this.openAfter.bind(this)} className="btn choose_btn">Import File</a>
							</div>*/}
						</div>
						<div className="col-md-9 col-sm-8"> 
							<div className="row">
								<div className="col-md-6">
									<PElements label="Organisation Name" 
									required="true" 
									error={this.state.errors.get('organisationName')}>
										<PInput
										type="text" 
										id="organisationName"
										refVal={(f)=> {this.organisationName=f}}
										elementClass="form-control" 
										validators={[ PRequired]}
										errors={this.state.errors}
										onValidationCheck={this.onValidationCheck}
										onChange={this.onChange}/>
										{/*<input type="text" className="form-control" id="organisation_name" ref={(f)=> {}}/>*/}
									</PElements>
								</div>
								<div className="col-md-6">
									<PElements
											label="Phone Number"
											required="true"
											error={this.state.errors.get('phoneNumber')}
									>
									  <PInput type="text"
											 elementClass="form-control"
											 id="phoneNumber"
											 refVal={(f)=> {this.phoneNumber=f}}
											 validators={[ PRequired]}
											 onValidationCheck={this.onValidationCheck}
									  />
									</PElements>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<PElements label="Provider ID"
											required="true"
											error={this.state.errors.get('providerId')}
										>
									  <PInput type="text"
													elementClass="form-control"
													id="providerId"
													refVal={(f)=> {this.providerId=f}}
													validators={[ PRequired]}
											onValidationCheck={this.onValidationCheck}
											/>
									</PElements>
								</div>
								<div className="col-md-6">
									<PElements label="Contact Person in IT"
									required="true"
											error={this.state.errors.get('contactPerson')}
									>
									  <PInput type="text" 
										elementClass="form-control" 
										id="contactPerson"
										refVal={(f)=> {this.contactPerson=f}}
										 validators={[ PRequired]}
										onValidationCheck={this.onValidationCheck} />
									</PElements>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
												<PElements label="Address"   required="true"
											error={this.state.errors.get('address')}
												>
													<PInput type="textarea" 
													elementClass="form-control" 
													id="address"
													refVal={(f)=> {this.address=f}}
													validators={[ PRequired]}
											onValidationCheck={this.onValidationCheck}
											></PInput>
												</PElements>
								</div>
								<div className="col-md-6">
									<PElements label="Website"
											error={this.state.errors.get('website')}
									required="true">
									  <PInput type="text" 
									  elementClass="form-control" 
									  id="website"
									  refVal={(f)=> {this.website=f}}
									  validators={[ PRequired]}
									  onValidationCheck={this.onValidationCheck}/>
									</PElements>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
										<PElements label="Type:" error="" required="true">		
										</PElements>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12 col-xs-12">
									<div>{this.state.orgRadio}</div>
									<label className="radio-inline">
									  <input type="radio" name="orgradio" value="1"
										checked={this.state.selectedOrgRadio === '1'} 
										onChange={this.handleOptionChange.bind(this)}
										/>Hospital
									</label>
									<label className="radio-inline">
									  <input type="radio" name="orgradio" value="2"
										checked={this.state.selectedOrgRadio === '2'}
										onChange={this.handleOptionChange.bind(this)}
										 />Clinic
									</label>
									<label className="radio-inline">
									  <input type="radio" name="orgradio" value="3"
										checked={this.state.selectedOrgRadio === '3'} 
										onChange={this.handleOptionChange.bind(this)}
										/>Individual Provider
									</label>
								</div>
								<div className="col-md-12">
									<button type="submit" className="btn db-table-btn"><span >+</span> Add Organisation</button>
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

handleOptionChange(changeEvent){
	this.setState({
			selectedOrgRadio: changeEvent.target.value
		});
}
handleOrganisationSubmit(event) {
   
    event.preventDefault();
	const organisation_name = this.organisationName.value;
	const phone_number = this.phoneNumber.value;
	const provider_id = this.providerId.value;
	const contact_person = this.contactPerson.value;
	const address = this.address.value;
	const website = this.website.value;
	const organisation_type = this.state.selectedOrgRadio;
	const organisation_image = this.refs.orgAvtar.value;
    // create a user object
    const organisation_Info = {
      organisation_name,
      phone_number, 
			provider_id,
			contact_person,
			address,
			website,
			organisation_type,
			organisation_image
    };
    $('#spinner').css({'display': ''});
    this.props.addOrg(organisation_Info, (err, res) => {
       $('#spinner').css({'display': 'none'});
      if (err) {
        toastr.error(err||'Request Failed');
      } else {
        toastr.success(res.message||"Requested successfully.");
				// clear form
				// this.organisationName.value="";
				// this.phoneNumber.value="";
				// this.providerId.value="";
				// this.contactPerson.value="";
				// this.address.value="";
				// this.website.value="";
		}
    });
  }
}
