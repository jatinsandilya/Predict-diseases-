'use strict';

import React, { Component } from 'react';
import OtherDetails from '../components/OtherDetailsComponent.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveOtherDetails } from '../actions/OtherDetails.js';

class OtherDetailsContainer extends Component {
  render() {
    return (
      <OtherDetails {...this.props}/>
    );
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
      saveOtherDetails: saveOtherDetails
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(OtherDetailsContainer);
