import React, { Component } from 'react';


export default class LoginNavBarComponent extends Component{
  render(){
    return(
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Predict Diseases</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Analytics Platform <span className="caret"></span></a>
                 <ul className="dropdown-menu">
                    <li><a href="/predict/index.html">Home</a></li>
                    <li><a href="/predict/login.html">Login</a></li>
                    <li><a href="/predict/subscription.html">Subscription</a></li>
                  </ul>
                </li>
        		<li><a href="#">Advisory</a></li>
        		<li><a href="#">About Us</a></li>
              </ul>
            </div>
          </div>
        </nav>
    )
  }

}
