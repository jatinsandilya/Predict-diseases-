import $ from 'jquery';
import axios from 'axios'
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import toastr from 'toastr';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class LoginNavBarComponent extends Component{
  render(){
    return(
      <footer>
	<div className="footer_bottom">
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<span>&copy; Copyright 2016-2017 Predict Diseases. All Rights Reserved   |   Privacy Policy</span>
				</div>
			</div>
		</div>
	</div>
</footer>
    )
  }

}
