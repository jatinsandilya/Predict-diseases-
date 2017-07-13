import React, { Component } from 'react';


export default class NavBarComponent extends Component{
  
  constructor(props) {
 	super(props);
	this.navTitle = this.props.title;
  }

  render(){
    return(
  	<section className="dashboard-right-top">
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-12">
					<h4>Organisation Profile & Subscription Management</h4>
			          <button
			            type="button"
			            className="navbar-toggle predict-nav-toggle"
			            data-toggle="collapse"
			            data-target=".sidebar-navbar-collapse">
			            <span className="sr-only">Toggle navigation</span>
			            <span className="icon-bar"></span>
			            <span className="icon-bar"></span>
			            <span className="icon-bar"></span>
			          </button>
				</div>
			</div>
		</div>
	</section>
    )
  }
}
