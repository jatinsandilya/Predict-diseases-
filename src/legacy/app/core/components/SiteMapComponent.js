import $ from 'jquery';
import axios from 'axios'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import toastr from 'toastr';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class NavBarComponent extends Component{
  constructor(props){
    super(props);
	//this.active=this.props.active;
	this.menuItems=[
		{id:1,text:"Organization Profile & Subscription Management"},
		{id:2,text:"Physician Findings"}
	]
  }

  render(){
	var activeMenu=this.props.active;
	var listItems = this.menuItems.map((list) => {
		var className=list.id==activeMenu?'active':'';
    return (
      <li id={list.id} key={list.id} className={className}>
		<a href="">{list.text}</a>
	  </li>
    );
  });

    return(
    	<div className="sidebar-nav predict-sidebar-nav">
    		<div role="navigation"
		    		 className="navbar navbar-default">
    				<div className="aside-dashboard navbar-collapse collapse sidebar-navbar-collapse">
							<div className="aside-logo">
								<a href="index.html" className="side-logo">Predict Diseases</a>
							</div>
							<div className="aside-dashboard-in">
								<div className="aside-avtar-outer">
									<img src="images/avtar.jpg" alt="" className="profile-img"/>
								</div>
								<ul className="aside-dd-ul">
								<li className="aside-with-dd">
									<a>Sophie Webber<i className="dd-arrow"></i></a>
									<ul className="aside-dd-ul-sub">
										<li><a href="">My Profile</a></li>
										<li><a href="">Change Password</a></li>
									</ul>
								</li>
								<li><a href="mailto:sophiewebber@email.com">sophiewebber@email.com</a></li>
								</ul>
								<ul className="aside-bottom-ul">
									{listItems}
								</ul>
								</div>
						</div>
    		</div>
    	</div>
    )
  }

}
