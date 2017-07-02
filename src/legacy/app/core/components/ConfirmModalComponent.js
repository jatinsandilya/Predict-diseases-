import React, { Component } from 'react';

export default class ConfirmModalComponent extends Component{

constructor(props, context) {
        super(props, context);		
				this.closeConfirm=this.props.onClose.bind(this);	
    }
  render(){   
    return(
						<div>
							<div className="modal-header pd-b-10" >
								<h4 className="modal-title">{this.props.title}</h4>
							</div>
							<div className="modal-body">
								{this.props.msgText}
							</div>
							<div className="modal-footer no-border" >
								<div className="text-right">
									<button type="button" className="btn btn-default" onClick={this.closeConfirm}>No</button>
									<button type="button" className="btn btn-danger" onClick={this.props.onYes}>Yes</button>
								</div>
							</div>
						</div>
    )
  }
}
