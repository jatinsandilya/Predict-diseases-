'use strict'

import React, {Component} from 'react'
import {Link} from 'react-router'
import store from '../../../store'

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


export default class HomeNavComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleJoin: false,
            visibleLogin: false,
        };
    }
    componentWillMount() {
        $('#myModal').modal({backdrop: 'static', keyboard: false});
        $('#joinModal').modal({backdrop: 'static', keyboard: false});
    }


    render() {
        return (
            <div>
                {this.navelem()}
                {this.loginrodal()}
                {this.joinrodal()}
            </div>
        );
    }

    navelem() {
        return (
            <nav className="navbar navbar-default nt-navfont nt-home">
                <div className="navbar-header nt-mright">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <ul>
                        <li>
                            <a className="navbar-brand homelogo" href="/">
                                    <span>
                                      <img src='/images/namelogo.png' className="nt-logo" alt='logo'/>
                                    </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right nt-navitem nt-navbar-nav">
                        <li><Link to='/'><span>PRODUCTS</span></Link></li>
                        <li><Link to='/'><span>PRICING</span></Link></li>
                        <li><Link to='/'><span>ABOUT</span></Link></li>
                        <li>
                            <Link to='/login'>
                                <span>Sign in</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/signup'>
                                <span>Join</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

    loginrodal() {
        return (
            <div className="smwrap" id="myModal">
                <Rodal  visible={this.state.visibleLogin}
                        onClose={this.hideLoginModal.bind(this)} className="sessionmodal" showMask={false} height={500} width={300}>

                    <div className="modbody flexwrap">
                        <div className="itemarea item2">
                            <div className="item2bg dashpad ptop3">
                                <div>
                                    <p className="sessbook">Sign In</p>
                                </div>
                            </div>
                            <div className="topicbg">
                                <div className="dashpad">
                                    <div className="marginbot">
                                        <div className="nt-dib">
                                        </div>
                                        <div className="nt-dib">
                                            <input type="email" className="form-control signuptext topicsearch"
                                                   ref="email"
                                                   placeholder="Email" id="email" required/>
                                        </div>
                                        <div className="nt-dib">
                                            <input type="password" className="form-control signuptext topicsearch"
                                                   ref="password"
                                                   placeholder="Password" id="password" required/>
                                        </div>
                                        <div className="fpcol">
                                            <Link to="/fpass">
                                                <p>Forgot Password?</p>
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="item2foot">
                                <button type="button" className="btn btn-default tsubbttn">Sign In</button>
                            </div>
                        </div>

                        <div>
                            <p>Need an account?</p><p><a href="#" className="fpcol">Join
                            </a></p>
                        </div>

                    </div>
                </Rodal>
            </div>
        )
    }

    joinrodal() {
        return (
            <div className="smwrap" id="joinModal">
                <Rodal visible={this.state.visibleJoin}
                        onClose={this.hideJoinModal.bind(this)} className="sessionmodal" showMask={false} height={600} width={700}>

                    <div className="modbody flexwrap">
                        <div className="itemarea item2">
                            <div className="item2bg dashpad ptop3">
                                <div>
                                    <p className="sessbook">Join</p>
                                </div>
                            </div>
                            <div className="topicbg">
                                <div className="dashpad">
                                    <div className="marginbot">
                                        <div>
                                            <input type="text" className="form-control signuptext topicsearch"
                                                   ref="fname"
                                                   placeholder="First Name" id="fname" required/>
                                        </div>
                                        <div>
                                            <input type="text" className="form-control signuptext topicsearch"
                                                   ref="lname"
                                                   placeholder="Last Name" id="lname" required/>
                                        </div>
                                        <div>
                                            <input type="email" className="form-control signuptext topicsearch"
                                                   ref="email"
                                                   placeholder="Email" id="email" required/>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="item2foot">
                                <button type="button" className="btn btn-default tsubbttn">Continue With Email</button>
                            </div>
                        </div>
                        <div>
                            <p>Already have an account?</p><p><a href="#" className="fpcol">Sign
                            In</a></p>
                        </div>
                    </div>
                </Rodal>
            </div>
        )
    }
    hideLoginModal(event){
        if (!event) {
            return;
        }
        this.setState({ visibleLogin: false });
    }
    hideJoinModal(event){
        if (!event) {
            return;
        }
        this.setState({ visibleJoin: false });
    }
    showLoginModal(event) {
        console.log('show login modal')
        this.setState({
            visibleJoin :false,
            visibleLogin: true
        });
        console.log(this.state.visibleLogin);
        console.log(this.state.visibleLogin);
    }
    showJoinModal(event) {
        console.log('show join modal')
        this.setState({
            visibleLogin: false,
            visibleJoin :true
        });
        console.log(this.state.visibleJoin);
        console.log(this.state.visibleLogin);
    }

}
