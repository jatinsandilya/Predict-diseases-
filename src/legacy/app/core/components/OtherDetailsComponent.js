import React, { Component } from 'react';
import $ from 'jquery';
import toastr from 'toastr';
import SubscriptionHilight from '../../ui/components/Highlighter/HighlightComponent';

export default class OtherDetails extends Component{

  render(){
    return(
     <section className="dashboard-right-bg-box subs_form">
			<form  onSubmit={this.handleSubmit.bind(this)}>
			<div className="container-fluid">
				<div className="dashboard-right-bg-shadow">
					<div className="row">
						<div className="col-md-12">
							<h4 className="db-r-form-title">Other Details</h4>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
							  <label >What is your current EMR System?</label>
							  <input type="text" className="form-control" id="other_details_fld1" ref="other_details_fld1"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
							  <label >Do you want to integrate our platform with current EMR? </label>
							  <input type="text" className="form-control" id="other_details_fld2" ref="other_details_fld2"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
							  <label >Do you want to link exisitng patient record with our system? </label>
							  <input type="text" className="form-control" id="other_details_fld3" ref="other_details_fld3"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
							  <label >Do you want to integrate our platform with current EMR? </label>
							  <input type="text" className="form-control" id="other_details_fld4" ref="other_details_fld4"/>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<button type="submit" className="btn db-table-btn">Save Details</button>
							</div>
					</div>
				</div>
				<SubscriptionHilight date="January 2017"></SubscriptionHilight>			
			</div>
			</form>
		</section>
    )
  }

	handleSubmit(event){
		const thisObj = this;
    event.preventDefault();
		let other_details_fld1 = thisObj.refs.other_details_fld1.value.trim();
		let other_details_fld2 = thisObj.refs.other_details_fld2.value.trim();
		let other_details_fld3 = thisObj.refs.other_details_fld3.value.trim();
		let other_details_fld4 = thisObj.refs.other_details_fld4.value.trim();
		let organisation_id=1;
		const other_details = {
      other_details_fld1,
      other_details_fld2,
			other_details_fld3,
			other_details_fld4,
			organisation_id
    };
		let queryData={other_details:other_details};
		this.props.saveOtherDetails(queryData, function (err, res) {
			 $('#spinner').css({'display': 'none'});
      if (err) {
        toastr.error(err||'Request Failed');
      } else {
        toastr.success(res.message||"Requested successfully.");
        // clear form
				  thisObj.refs.other_details_fld1.value="";
					thisObj.refs.other_details_fld2.value="";
					thisObj.refs.other_details_fld3.value="";
					thisObj.refs.other_details_fld4.value="";
			}
		});
	}
}
