import React, { Component } from 'react';

import $ from 'jquery';
import {Link} from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { browserHistory } from 'react-router';
import toastr from 'toastr';

export default class LoginNavBarComponent extends Component{
  render(){
    return(
     <div className="row">
					<div className="col-md-12 center">
						<a href="" className="ur-subs-btn">Your current subscription is valid till January 2017</a>
					</div>
				</div>
    )
  }
}
