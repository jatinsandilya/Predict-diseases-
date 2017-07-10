import React, { Component } from 'react';

import ConfirmModalComponent from '../components/ConfirmModalComponent';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { confirmModal } from '../actions/ConfirmModal';;


class ConfirmModalContainer extends Component {
  render() {
    return (
      <ConfirmModalComponent {...this.props}       
      />
    );
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
    confirmModal:confirmModal
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(ConfirmModalContainer);