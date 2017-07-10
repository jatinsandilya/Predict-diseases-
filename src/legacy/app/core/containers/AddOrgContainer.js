import React, { Component } from 'react';

import AddOrgComponent from '../components/AddOrgComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addOrg } from '../actions/AddOrg.js';

class AddOrgContainer extends Component {
  render() {
    return (
      <AddOrgComponent addOrg={this.props.addOrg}/>
    );
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
      addOrg: addOrg
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(AddOrgContainer);
