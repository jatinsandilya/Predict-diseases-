import React, { Component } from 'react';
import PredictDiseasesNavBar from './NavBarComponent.js';
import PredictDiseasesSiteMap from './SiteMapComponent.js';
import SubscriptionComponent from './SubscriptionComponent'


class AppSubscriptionComponent extends Component {

  componentWillMount() {
     this.props.loadPatientData();
     this.props.loadTeamData();
  }
  render() {
    return (
      <div>       
        <PredictDiseasesSiteMap active="1"/>
        <div className="aside-margin">
        <div className="dashboard-right">
             <PredictDiseasesNavBar title="Organisation Profile and Subscription Management"/>
             <SubscriptionComponent {...this.props}/>
            </div>
        </div>        
      </div>
    );
  }
}

export default AppSubscriptionComponent;