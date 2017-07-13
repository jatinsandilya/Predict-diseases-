import React, { Component } from 'react';


class Confirmmodal extends Component {
    render() {
        const {} = this.props
        return (
        <View>
            <div>
								<div className="modal-header" >
									<h4 className="modal-title">Are you sure?</h4>
									</div>
									<div className="modal-body">Would you like to remove this item from the list?</div>
									<div className="modal-footer" >
										<div className="text-right">
											<button type="button" className="btn btn-default">No</button>
											<button type="button" className="btn btn-danger">Yes</button>
									</div>
									</div>
								</div>
         </View>
        );
    }
}

export default Confirmmodal;
