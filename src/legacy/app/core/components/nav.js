'use strict'

import React, {Component,PropTypes} from 'react'
import {Link , IndexLink} from 'react-router'
import PubNub from 'pubnub';
import moment from 'moment';

const pubnub = new PubNub({
    publishKey: 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c',
    subscribeKey: 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe'
});


class NavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {shrink: false};
  }
  componentDidMount(){
      let _this = this;
    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                console.log("PubNub Listener Ready");
            }
        },
        message: function(m) {
            _this.props.getNotifications(_this.props.auth.user_id);
        }
    });

    pubnub.subscribe({
        channels: ['session'],
        withPresence: false
    });

    //  $('a[href="' + this.location.pathname + '"]').parent().addClass('active');

    }

  shrinkSidebar() {
    this.setState({
      shrink: !this.state.shrink
    });
  }

  render() {

    let toggleSidebarCollpase = this.state.shrink ? 'tfmenu-sidebar-collapsed' : '';
    let toggleCardWrapper = this.state.shrink ? 'tfmenu-card-wrapper-collapsed' : '';

  return (localStorage.getItem('user_role') === "Student" || localStorage.getItem('user_role') === "Parent") ?
    <div className="canavbar" id="mainNavBar">
      <nav className="navbar navbar-default nt-navfont">
        <div className="navbar-header nt-mright">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <ul>
            <li className="">
              <IndexLink to='/app' className="navbar-brand nt-brandpad" activeClassName='current-link'>
                <div className="nt-logospace">
                  <img src='/images/logo.png' className="nt-logo" alt='logo'/>
                </div>
              </IndexLink>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav nt-navitem nt-navbar-nav">
            <li className="nt-fclass"><IndexLink to='/app/myclasses' activeClassName='current-link'><span>My Classes</span></IndexLink></li>
            <li><Link to='/app/calender' activeClassName='current-link'><span>My Calendar</span></Link></li>
            <li><Link to='/app/teachers' activeClassName='current-link'><span>My Teachers</span></Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right nt-rightnav">
            <li className="nt-explore">
              <Link to='/courses' className="nt-padtop">

                <div className="nt-dib nt-iconalign">
                  <span>
                      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid"
                           xmlns="http://www.w3.org/2000/svg" className="nt-searchicon">
                        <path
                          d="M16.615385 10.1538462c0-1.7788551-.632205-3.3004745-1.896635-4.5649039-1.264429-1.26442938-2.786049-1.8966346-4.564903-1.8966346-1.778856 0-3.300476.63220522-4.564904 1.8966346-1.2644295 1.2644294-1.896636 2.7860488-1.896636 4.5649039 0 1.778855.6322065 3.3004744 1.896636 4.5649038 1.264428 1.2644294 2.786048 1.8966347 4.564904 1.8966347 1.778854 0 3.300474-.6322053 4.564903-1.8966347 1.26443-1.2644294 1.896635-2.7860488 1.896635-4.5649038zm7.384615 12c0 .5000025-.182691.9326904-.548078 1.2980769C23.086536 23.8173094 22.653849 24 22.153847 24c-.519234 0-.951921-.1826906-1.298078-.5480769l-4.947116-4.9326924c-1.721161 1.1923137-3.639412 1.7884616-5.754806 1.7884616-1.375007 0-2.689898-.2668242-3.944712-.8004807-1.254815-.5336565-2.336534-1.2548031-3.245192-2.1634616-.9086595-.9086585-1.6298055-1.9903784-2.163462-3.2451923C.2668245 12.8437437 0 11.528853 0 10.1538462c0-1.37500692.2668245-2.68989762.800481-3.94471158.5336565-1.25481397 1.2548025-2.33653392 2.163462-3.2451923.908658-.9086584 1.990377-1.62980503 3.245192-2.16346155C7.463949.26682428 8.77884 0 10.153847 0c1.375006 0 2.689897.26682426 3.94471.80048078 1.254814.5336565 2.336535 1.25480314 3.245193 2.16346153.908658.9086584 1.629806 1.99037835 2.163462 3.24519232.533657 1.25481396.800481 2.56970466.800481 3.94471158 0 2.1153951-.596148 4.0336452-1.788462 5.7548076l4.947116 4.9471155c.355769.3557709.533653.788459.533653 1.2980769z"
                          fill="#8D9CA8" fillRule="evenodd" opacity=".5"/>
                      </svg>
                  </span>
                </div>

                <div className="nt-dib">
                  <span>Explore</span>
                </div>

              </Link>
            </li>
            <li className="dropdown nt-rborder">
              <a href="#" className="dropdown-toggle nt-padtop" data-toggle="dropdown" role="button"
                 aria-haspopup="true" aria-expanded="false">

                <div className="nt-name nt-dib mtop05">
                  Hi, {this.props.auth.fullName} &nbsp; !
                </div>

                <div className='nt-dib'>
                  <div className='nt-propic'>
                    <img src={this.props.auth.picture} alt='profile photo'/>
                  </div>
                </div>
                <span className="caret nt-dropicon"></span>
              </a>

              <ul className="dropdown-menu nt-dropmenu">
                <li>
                  <Link to='/app/settings'>
                    <span>

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid" className="settype">
                        <path d="M42 7.99997l-1.9062 10.5c-4.4057 1.38598-8.3885 3.68484-11.7813 6.65627l-9.9687-3.84377L10 34.96874l8 7.0937c-.6276 2.543-.9688 5.2006-.9688 7.93748 0 2.7369.3412 5.3946.9688 7.9376l-8 7.0937 8.3438 13.6563 9.9687-3.8438c3.3928 2.9713 7.3757 5.2703 11.7813 6.6563l1.9062 10.5h16l1.9062-10.5c4.4057-1.386 8.3884-3.685 11.7813-6.6563l9.9687 3.8438L90 65.03122l-7.9688-7.125c.6217-2.5318.9376-5.1825.9376-7.9063 0-2.72389-.3159-5.37429-.9376-7.90619L90 34.96873l-8.3438-13.65627-9.9687 3.84377c-3.3929-2.97143-7.3756-5.27029-11.7813-6.65627L58 7.99996H42zm8 23.99997c9.9412 0 18 8.0588 18 17.99998 0 9.9412-8.0588 18.0001-18 18.0001-9.9411 0-18-8.0589-18-18.0001 0-9.94118 8.0589-17.99998 18-17.99998z" overflow="visible" color="#000"/>
                      </svg>
                    </span>
                    <span>Settings</span>
                  </Link>
                </li>
                <li onClick={() => this.props.logout()}><Link to="">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 640" preserveAspectRatio="xMidYMid" className="settype">
                      <path d="M0 99.07c.88-4.5 1.65-9 2.66-13.5C13.7 36.81 57.1 1.37 107.4.24c14.4-.33 28.81-.29 43.21 0 24.11.41 43.16 19.39 43.48 43a43.67 43.67 0 0 1-42.41 44.51c-12.79.46-25.6.07-38.41.16-16.73.12-25.61 9.1-25.62 25.84v284.09c0 17.06 8.92 26 25.89 26.11 13.33.07 26.7-.4 40 .34 31.22 1.74 50.41 36.47 35.46 64-7.43 13.67-19 22.62-34.76 23.22-19.15.72-38.5 1.1-57.53-.75-48.39-4.76-88.89-44.88-95.58-93-.24-1.76-.75-3.44-1.13-5.15V99.07z"/>
                      <path d="M361.56 219.69c-2.09-2.29-3.3-3.7-4.6-5-18.53-18.69-37.16-37.29-55.56-56.1-14.85-15.19-16.68-38.47-4.69-55.24 12.73-17.81 35.68-24.18 54.87-14.75a49.58 49.58 0 0 1 12.84 9.32q67.06 66.82 133.83 133.93c18.35 18.43 18.32 44.83-.09 63.29Q432.82 360.66 367.28 426c-18.2 18.14-45.31 18.26-63.06.59-17.33-17.26-16.92-44.31 1.14-62.54q25.71-26 51.7-51.64a32.79 32.79 0 0 1 4.32-3.11l-.82-1.93H175.44c-21.27 0-39.45-13.86-44.11-33.34-6.72-28.06 13.82-54.11 43.09-54.24 38.59-.18 77.19 0 115.79 0h71.35z"/>
                    </svg>
                  </span>
                  <span>Logout</span>
                </Link>
                </li>
              </ul>
            </li>
            <li className="nt-msgarea">
              <a href="#" onClick={this.updateNotification.bind(this)} className="dropdown-toggle ptopzero" data-toggle="dropdown" role="button"
                 aria-haspopup="true" aria-expanded="false">
              <div className="nt-dib mt1">
                <span className="nt-bookimg">
                    <svg viewBox="0 0 40 32" preserveAspectRatio="xMidYMid"
                         xmlns="http://www.w3.org/2000/svg" className="nt-notify">
                      <g fill="#8D9CA8" fillRule="evenodd">
                          <path
                            d="M38.202.01h-11.88c-3.888 0-5.787.92-6.71 1.876C18.69.93 16.788.01 12.9.01H1.023C.456.01 0 .478 0 1.05v28.324c0 .572.456 1.038 1.022 1.038h11.881c2.508 0 5.013 1.08 5.037 1.212h.015c.51.384.513.376 1.022.376h1.36c.518 0 .544.008 1.006-.48.082-.143 2.673-1.11 4.977-1.11H38.2c.568 0 1.025-.465 1.025-1.036V1.05c0-.572-.456-1.04-1.023-1.04zm-20.13 3.763v25.934s-2.18-1.212-5.122-1.212H2.07V1.93h10.88c5.694 0 5.122 1.843 5.122 1.843zm12.88 14.6c-1.435 1.148-1.838 1.863-2.3 2.326-.46-.464-.844-1.204-2.3-2.326-1.402-1.077-3.22-2.585-3.22-4.63 0-3.008 3.68-4.164 5.52-1.384 1.84-2.78 5.52-1.624 5.52 1.404 0 2.05-1.837 3.51-3.22 4.61z"/>
                          <path
                            d="M9.394 10.85h5.1V9.6h-5.1v1.25zm5.1 1.253H5.426v1.25h9.066v-1.25zm0 2.5H5.426v1.253h9.066v-1.252zm0 2.504H5.426v1.25h9.066v-1.25zm0 2.503H5.426v1.25h9.066v-1.25z"/>
                      </g>
                    </svg>
                </span>
                <span className="nt-booknot">
                    {this.props.unread_notifications.length > 0 ?
                        <div className="nt-msgnotify">
                          <span className="nt-notifynum">
                              {this.props.unread_notifications.length}
                          </span>
                        </div>
                        :
                        null
                    }

                </span>
              </div>
            </a>
            <ul className="dropdown-menu nt-dropmenu wid30rem">
                {this.props.activities.length > 0 ?
                    this.notificationList("/app/myclasses/")
                    :
                    <li className="dashpad">
                      You have no Notifications
                    </li>
                }
            </ul>

            </li>

            <li className='nt-myclass'>
              <div>
                <div className="nt-sidecol"  onClick={this.shrinkSidebar.bind(this)}>
                  <img src='/images/listicon.png' alt='logo'/>
                </div>
              </div>
            </li>

          </ul>
        </div>
      </nav>
    </div>

      :
    <div className="canavbar" id="mainNavBar">
      <nav className="navbar navbar-default nt-navfont">
        <div className="navbar-header nt-mright">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <ul>
            <li className="">
              <IndexLink to='/teacher' className="navbar-brand nt-brandpad" activeClassName='current-link'>
                <div className="nt-logospace">
                  <img src='/images/logo.png' className="nt-logo" alt='logo'/>
                </div>
              </IndexLink>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav nt-navitem nt-navbar-nav">
            <li className="nt-fclass"><IndexLink to='/teacher/mysessions' activeClassName='current-link'><span>My Classes</span></IndexLink></li>
            <li><Link to='/teacher/mycalendar' activeClassName='current-link'><span>My Calendar</span></Link></li>
            {/*<li><Link to='/teacher/mystudents' activeClassName='current-link'><span>My Students</span></Link></li>*/}
            <li><Link to='/teacher/myprofile' activeClassName='current-link'><span>My Profile</span></Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right nt-rightnav">
            <li className="dropdown nt-rborder">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                 aria-haspopup="true" aria-expanded="false">

                <div className="nt-name nt-dib padtop05">
                  Hi, {this.props.auth.fullName} &nbsp;
                </div>

                <div className='nt-dib'>
                  <div className='nt-propic'>
                    <img src={this.props.auth.picture} alt='profile photo'/>
                  </div>
                </div>
                <span className="caret nt-dropicon"></span>
              </a>

              <ul className="dropdown-menu nt-dropmenu">
                <li>
                  <Link to='/teacher/setting'>

                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid" className="settype">
                        <path d="M42 7.99997l-1.9062 10.5c-4.4057 1.38598-8.3885 3.68484-11.7813 6.65627l-9.9687-3.84377L10 34.96874l8 7.0937c-.6276 2.543-.9688 5.2006-.9688 7.93748 0 2.7369.3412 5.3946.9688 7.9376l-8 7.0937 8.3438 13.6563 9.9687-3.8438c3.3928 2.9713 7.3757 5.2703 11.7813 6.6563l1.9062 10.5h16l1.9062-10.5c4.4057-1.386 8.3884-3.685 11.7813-6.6563l9.9687 3.8438L90 65.03122l-7.9688-7.125c.6217-2.5318.9376-5.1825.9376-7.9063 0-2.72389-.3159-5.37429-.9376-7.90619L90 34.96873l-8.3438-13.65627-9.9687 3.84377c-3.3929-2.97143-7.3756-5.27029-11.7813-6.65627L58 7.99996H42zm8 23.99997c9.9412 0 18 8.0588 18 17.99998 0 9.9412-8.0588 18.0001-18 18.0001-9.9411 0-18-8.0589-18-18.0001 0-9.94118 8.0589-17.99998 18-17.99998z" overflow="visible" color="#000"/>
                      </svg>
                    </span>
                    <span>Settings</span>
                  </Link>

                </li>

                <li onClick={() => this.props.logout()}><Link to="">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 640" preserveAspectRatio="xMidYMid" className="settype">
                      <path d="M0 99.07c.88-4.5 1.65-9 2.66-13.5C13.7 36.81 57.1 1.37 107.4.24c14.4-.33 28.81-.29 43.21 0 24.11.41 43.16 19.39 43.48 43a43.67 43.67 0 0 1-42.41 44.51c-12.79.46-25.6.07-38.41.16-16.73.12-25.61 9.1-25.62 25.84v284.09c0 17.06 8.92 26 25.89 26.11 13.33.07 26.7-.4 40 .34 31.22 1.74 50.41 36.47 35.46 64-7.43 13.67-19 22.62-34.76 23.22-19.15.72-38.5 1.1-57.53-.75-48.39-4.76-88.89-44.88-95.58-93-.24-1.76-.75-3.44-1.13-5.15V99.07z"/>
                      <path d="M361.56 219.69c-2.09-2.29-3.3-3.7-4.6-5-18.53-18.69-37.16-37.29-55.56-56.1-14.85-15.19-16.68-38.47-4.69-55.24 12.73-17.81 35.68-24.18 54.87-14.75a49.58 49.58 0 0 1 12.84 9.32q67.06 66.82 133.83 133.93c18.35 18.43 18.32 44.83-.09 63.29Q432.82 360.66 367.28 426c-18.2 18.14-45.31 18.26-63.06.59-17.33-17.26-16.92-44.31 1.14-62.54q25.71-26 51.7-51.64a32.79 32.79 0 0 1 4.32-3.11l-.82-1.93H175.44c-21.27 0-39.45-13.86-44.11-33.34-6.72-28.06 13.82-54.11 43.09-54.24 38.59-.18 77.19 0 115.79 0h71.35z"/>
                    </svg>
                  </span>
                  <span>Logout</span>
                </Link>
                </li>

              </ul>
            </li>
            <li className="dropdown nt-msgarea">
              <a onClick={this.updateNotification.bind(this)} href="#" className="dropdown-toggle ptopzero" data-toggle="dropdown" role="button"
                 aria-haspopup="true" aria-expanded="false">
              <div className="nt-dib mtop05">
                <span className="nt-bellimg">
                    <svg viewBox="0 0 29 32" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg" className="nt-bells">
                      <path d="M27.675 22.05c-1.9-.925-3.025-3.425-3.3-8.05C24.05 8.6 22.9 3.675 16.7 2.675 16.55.8 15.375 0 14.2 0s-2.3.85-2.45 2.675C5.575 3.675 4.425 8.55 4.075 14 3.8 18.325 2.8 21.1.775 22.075c-.75.375-.775.25-.775 1.65C0 25 0 25 1.275 25H27.2c1.275 0 1.275 0 1.275-1.275s.025-1.275-.8-1.675zM14.2 31.225c1.925 0 3.875-1.125 3.875-3.725h-7.7c0 2.525 1.85 3.725 3.825 3.725z" fill="#8D9CA8" fillRule="evenodd"/>
                    </svg>


                </span>
                <span className="nt-req">
                    {this.props.unread_notifications.length > 0 ?
                        <div className="nt-noti">
                            <span className="nt-num">
                              {this.props.unread_notifications.length}
                           </span>
                        </div>
                        :
                        null
                    }
                </span>
                <span><p className="nt-fs11">Requests</p></span>
              </div>
            </a>

            <ul className="dropdown-menu nt-dropmenu wid30rem">
                {this.props.activities.length > 0 ?
                    this.notificationList("/teacher/mysessions/")
                    :
                    <li className="dashpad">
                      You have no Notifications
                    </li>
                }
            </ul>

            </li>

            <li className="nt-myclass">
              <div>
                <div className="nt-sidecol" onClick={this.shrinkSidebar.bind(this)}>
                  <img src='/images/listicon.png' alt='logo'/>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  }

  notificationList(url){
      return this.props.activities.map(activity =>{
          return (
              <li className="botbor" key={activity._id}>
                  <div className="row msgarea dashpad">
                    <Link to={url+activity.activity.object.reference}>
                      <div className="col-lg-2">
                        <span className="timg">
                            <img className="roundimg" src={activity.activity.actor.user.picture} alt=""/>

                        </span>
                      </div>
                      <div className="col-lg-10">
                          <p className="notilist">
                              <p className="tname nt-dib">{activity.activity.actor.user.fullName} &nbsp;</p><p className="feedback nt-dib">{activity.activity.context} &nbsp;</p><p className="greencourse nt-dib">{activity.activity.target.prefix + activity.activity.target.name}</p>
                              <p className="messagetime">{moment(activity.updatedAt).format('DD MMM YYYY')}</p>
                          </p>
                      </div>
                      </Link>
                  </div>
              </li>
          )
      });
  }


    updateNotification(){
        this.props.updateNotifications(this.props.auth.user_id);
    }
}
NavComponent.propTypes = {
  auth: PropTypes.object
}
export default NavComponent;
