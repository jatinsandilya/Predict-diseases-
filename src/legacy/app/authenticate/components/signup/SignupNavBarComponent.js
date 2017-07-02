import $ from 'jquery';
import axios from 'axios'
import ReactDOM from 'react-dom';
import toastr from 'toastr';
import React, { Component } from 'react';
import {Link} from 'react-router';
import { browserHistory } from 'react-router';

export default class SignupNavBarComponent extends Component{
  render(){
    return(
      <nav className="navbar navbar-default nt-signnav">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand signlogo" href="/">
                <span>
                  <img src='/images/namelogo.png' className="nt-logo" alt='logo'/>
                </span>
              </a>
            </div>


            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="gotolink">
                  <p>
                    <Link to="/login">Already have an account?</Link>
                  </p>
                </li>
                <li className="gobtn">
                  <Link to='/login' className="">
                    <button type="login" className="btn btn-default loginbtn">Log In</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
    )
  }

}
