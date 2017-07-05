import React, { Component } from 'react';

import $ from 'jquery';
import AddOrgContainer from '../containers/AddOrgContainer';
import {Link} from 'react-router';
import OtherDetailsContainer from '../containers/OtherDetailsContainer';
import PatientDetails from './PatientDetailsComponent';
import ReactDOM from 'react-dom';
import TeamDetails from './TeamDetailsComponent';

export default class SubscriptionComponent extends Component{
  constructor(props){
    super(props);
    // this.state = {assignedPhysicians : this.props.assignedPhysicians,teamDetails:this.props.teamDetails,patientDetails:this.props.patientDetails}
  }
  
  render(){
    console.log('in SubscriptionComponent',this.props);
    return(<div>
			      <AddOrgContainer />
            <TeamDetails {...this.props}/>
            <PatientDetails {...this.props}/>
            <OtherDetailsContainer />
        </div>)
  }
}