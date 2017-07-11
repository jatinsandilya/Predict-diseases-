/* eslint-disable */
const sharedReducers = (
    state = { 
        modalInstance:{currentModal:null}
    },
    action) => {
    switch (action.type) {     
        case 'SHOW_MODAL':
            state.modalInstance.currentModal=action.payload.currentModal;
            state = Object.assign({},state);
            return state
            break;
        default:
            return state;
    }
};
export default sharedReducers