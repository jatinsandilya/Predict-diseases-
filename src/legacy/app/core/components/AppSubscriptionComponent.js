import React, { Component } from 'react';
import PredictDiseases_navBar from './NavBarComponent.js';
import PredictDiseases_siteMap from './SiteMapComponent.js';
import SubscriptionComponent from './SubscriptionComponent'


class AppSubscriptionComponent extends Component {

  componentWillMount() {
     this.props.loadPatientData();
     this.props.loadTeamData();
  }
  render() {
    return (
      <div>       
        <PredictDiseases_siteMap active="1"/>
        <div className="aside-margin">
        <div className="dashboard-right">
             <PredictDiseases_navBar title="Organisation Profile and Subscription Management"/>
             <SubscriptionComponent {...this.props}/>
            </div>
        </div>        
      </div>
    );
  }
}

export default AppSubscriptionComponent;