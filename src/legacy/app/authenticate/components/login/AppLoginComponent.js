import $ from 'jquery';
import ReactDOM from 'react-dom';
import toastr from 'toastr';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import LoginNavBar from './LoginNavBarComponent.js';
import LoginFooter from './LoginFooterComponent.js';

class AppLoginComponent extends Component {

  render() {
    return (

      <div>
        <LoginNavBar/>
        {this.loginForm()}
        <LoginFooter/>
      </div>


    );
  }

  loginForm(){
    return(
      <div>
        <section className="login_sec">
<div className="container">
		<div className="row">
			<div className="col-md-12">
				<h2>Log into your account</h2>
			</div>
		</div>
		<div className="row">
			<div className="col-md-6">
				<h4>Not yet a Predict Diseases Subscriber? </h4>
				<p>Start predicting diseases now with this 14 days free trial. Click <a href="">here</a> for an easy sign up. </p>
			</div>
			<div className="col-md-6">
				 <form  onSubmit={this.handleSubmit.bind(this)}>
				  <div className="form-group">
					<label htmlFor="username">Username</label>
					<input type="text" className="form-control" id="username" ref="username"/>
				  </div>
				  <div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" className="form-control" id="password"  ref="password"/>
				  </div>
				  <div className="form-check">
					<label className="form-check-label">
					  <input type="checkbox" className="form-check-input"/>
					  Remember Me
					</label>
					<a href="">Forgot Password?</a>
				  </div>
				  <button type="submit" className="btn btn-login">Login</button>
				</form>
			</div>
		</div>
	</div>
      </section>
      </div>
    )
  }

  handleSubmit(event) {
    const thisObj = this;
    event.preventDefault();

    const username = ReactDOM.findDOMNode(thisObj.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(thisObj.refs.password).value.trim();

    // Validations
    if (username.length < 1) {
      toastr.warning('username is required.', 'Login');
      return false;
    }
    if (password.length < 1) {
      toastr.warning('Password is required.', 'Login');
      return false;
    }

    // create a user object
    const user = {
      username,
      password
    };

    $('#spinner').css({'display': ''});

    this.props.appLogin(user, function (err, res) {
      $('#spinner').css({'display': 'none'});
      if (err) {
        toastr.error('Wrong username or password.', 'Login');
      } else {
        console.log('authLogin...', res);
        localStorage.setItem('token', res.token);
        toastr.success(res.message);

        // clear form

        ReactDOM.findDOMNode(thisObj.refs.username).value = '';
        ReactDOM.findDOMNode(thisObj.refs.password).value = '';
        browserHistory.push('/subscription');
      }
    });
  }

}
export default AppLoginComponent;
