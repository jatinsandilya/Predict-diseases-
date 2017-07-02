'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PredictDiseases_siteMap from '../components/SiteMapComponent.js';
import PredictDiseases_navBar from '../components/NavBarComponent.js';

class PhysicianFindingsContainer extends Component {
  constructor(props){
    super(props);
  }
  render() {    
    return (
      <div>    
        <PredictDiseases_siteMap active="2"/>
         <div className="aside-margin">
          <div className="dashboard-right">
          <PredictDiseases_navBar title="Physician Findings"/>

          </div>
        </div>        
      </div>
    );
  }
  componentDidMount() {
  }
}

//methods
function matchDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

//properties
var mapStateToProps = function(state){
    return {      
      
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(PhysicianFindingsContainer);
