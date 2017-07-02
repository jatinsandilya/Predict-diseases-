
import * as _ from 'lodash';

let defaultState = {
    notifications : [],
    unread_notifications : []
};
const coreReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_NOTIFICATION_RESOLVED':
            return Object.assign({}, state, {notifications: action.payload.data.activities});
        case 'GET_UNREAD_NOTIFICATION_RESOLVED':
            return Object.assign({}, state, { unread_notifications: _.filter(state.notifications,function(activity){
                return activity.marked_as_read === false;})
            });
        default :
            return state;
    }
};

export default coreReducers;
