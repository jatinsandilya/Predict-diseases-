import React, { Component } from 'react';

export default class ImportExport extends Component{
constructor(props, context) {
        super(props, context);		
				//this.closeConfirm=this.props.onClose.bind(this);	
    }
  render(){   
    return(<div>
				<div className="modal-header pd-b-10">
					<h4 className="modal-title">Choose Option</h4>
					</div>
				<div className="modal-body">
				<div className="row text-center">
				<div className="col-xs-6">
					<button className="glyphicon glyphicon-cloud-download btn btn-lg impexpBtn"></button>
					<label>Export Template</label>			
					</div>
					<div className="col-xs-5">
						<button className="glyphicon glyphicon-cloud-upload btn btn-lg impexpBtn"></button>
						<label>Import Excel</label>    			
					</div>
				</div>
				</div></div>)
  }
}
