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
						{/*<h4>{this.navTitle}</h4>
						<ul className="db-right-search-noti">
							<li className="top_search"><a href="javascript:;"><img src="images/db-search-icon.png"/></a></li>
							<li className="top_noti"><a href="javascript:;"><img src="images/noti-bell.png"/></a><span>1</span></li>
						</ul>*/}
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
