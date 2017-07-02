import $ from 'jquery';
import axios from 'axios'
import ReactDOM from 'react-dom';
import toastr from 'toastr';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import SignupNavBar from './SignupNavBarComponent.js';

class AppSignupComponent extends Component {
  constructor(props) {
    super(props);
    super(props);
    this.state = {
      type: "Student"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
        $('#select-user').select2({
            minimumResultsForSearch: Infinity
        });
    }

  render() {
    return (
      <div>
        <SignupNavBar/>
        {this.signupForm()}
      </div>
    );
  }

  signupForm(){
    return (
      <div className="nt-signup">
        <div className="sarea">
          <div className="leftarea">
            <div className="bg_splitscreen">
              <div className="testimonial">
                <span>
                  <svg viewBox="0 0 69 54" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" className="quote">
                    <path d="M49.8305126 53.30706c6.1805287 0 11.5884913-5.0216796 11.5884913-11.3953498 0-5.6011041-4.6353965-10.4296422-10.0433591-11.3953498.1931415-5.4079626 4.4422549-16.0307463 17.1895954-25.30153932L65.0886928 0C44.42255 10.8159252 37.0831722 27.4260961 37.0831722 38.0488798c0 10.0433591 5.9873871 15.2581802 12.7473404 15.2581802zm-37.0831722 0c6.1805287 0 11.5884913-5.0216796 11.5884913-11.3953498 0-5.6011041-4.6353965-10.4296422-10.0433591-11.3953498.1931415-5.4079626 4.442255-16.0307463 17.1895954-25.30153932L28.0055206 0C7.33937782 10.8159252 0 27.4260961 0 38.0488798 0 48.0922389 5.79424565 53.30706 12.7473404 53.30706z" fill="#82C484" fillRule="evenodd"/>
                  </svg>
                </span>
                <h3 className="testhead">Living !</h3>
                <div>
                  <p className="testpara">
                    Let the wife make the husband glad to come home, and let him make her sorry to see him leave
                  </p>
                </div>
                <div className="namearea">
                  <h4 className="testname">MARTIN LUTHER</h4>
                  <p className="testdegree">Math Honors</p>
                </div>
              </div>
            </div>
          </div>
          <div className="righttarea">
          <div className="rightform">
            <form  className="sform" onSubmit={this.handleSubmit.bind(this)} >
              <h2 className="form-signin-heading signupheader">Create Your Free Account Today!</h2><br/>
              <p className="form-signin-para signuppara">It’s a great day to find something new. Create your free account:</p><br/>
              <div className="form-group">
                <label htmlFor="exampleInputfullName"
                       className="signupname">Name</label>
                <input type="text" className="form-control signuptext"
                       ref="fullName"
                       placeholder=""/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1"
                       className="signupname">Email</label>
                <input type="email" className="form-control signuptext" ref="email"
                       placeholder=""/>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="signupname">Password</label>
                <input type="password" className="form-control signuptext"
                       ref="password"
                       placeholder="5+ characters"/>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-lg btn-block signupbtn">
                  Sign up for Free
                </button>
              </div>
               <div className="form-group">
                <button type="submit" className="btn btn-lg btn-block fbsignupbtn">
                  or Sign up with Facebook
                </button>
              </div>
            </form>
          </div>

          </div>
        </div>
      </div>
    )
  }

  handleChange(event) {
    if (event.target.value === "Parent") {
      this.setState({type: "Parent"});
    } else if (event.target.value === "Teacher") {
      this.setState({type: "Teacher"});
    } else {
      this.setState({type: "Student"});
    }
  }

  handleSubmit(event) {
    const thisObj = this;
    event.preventDefault();
    const fullName = ReactDOM.findDOMNode(thisObj.refs.fullName).value.trim();
    const email = ReactDOM.findDOMNode(thisObj.refs.email).value.trim();
    const password = ReactDOM.findDOMNode(thisObj.refs.password).value.trim();
    const type = this.state.type;

    // Validations
    if (email.length < 1) {
      toastr.warning('Email Address is required.', 'Signup');
      return false;
    }
    if (password.length < 1) {
      toastr.warning('Password is required.', 'Signup');
      return false;
    }
    if (fullName.length < 1) {
      toastr.warning('FullName is required.', 'Signup');
      return false;
    }

    // create a user object
    const user = {
      fullName,
      email,
      password,
      type
    };
     $('#spinner').css({'display': ''});

    this.props.appSignup(user, function (err, res) {

       $('#spinner').css({'display': 'none'});


      if (err) {
        toastr.error(err.message, 'Singup');
      } else {
        localStorage.setItem('token', res.data.id_token);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('user_id', res.data.identities[0].user_id);
        localStorage.setItem('user_role', res.data.user_metadata.roles);
        localStorage.setItem('picture', res.data.picture);
        toastr.success('Logged in Successfully', 'Signup');


        //clear form
        ReactDOM.findDOMNode(thisObj.refs.email).value = '';
        ReactDOM.findDOMNode(thisObj.refs.fullName).value = '';
        ReactDOM.findDOMNode(thisObj.refs.password).value = '';

        // entering into app
        browserHistory.push('/app');
      }
    });
  }
}
export default AppSignupComponent;
