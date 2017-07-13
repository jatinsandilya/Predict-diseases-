import React, { Component } from 'react';

import AddOrgContainer from '../containers/AddOrgContainer';

import OtherDetailsContainer from '../containers/OtherDetailsContainer';
import PatientDetails from './PatientDetailsComponent';
import TeamDetails from './TeamDetailsComponent';

export default class SubscriptionComponent extends Component{
  
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