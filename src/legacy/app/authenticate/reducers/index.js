const defaultState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  message: localStorage.getItem('message') ? localStorage.getItem('message') : null
}

const authenticateReducer = (state = defaultState , action) => {
  switch (action.type) {
    case 'AUTH_SIGNUP_REQUEST':
      return state;
    case 'AUTH_SIGNUP_FAILURE':
      return state;
    case 'AUTH_SIGNUP_SUCCESS':
      return Object.assign({}, state, {
        token: action.payload.token ? action.payload.token : null,
        message: action.payload.message ? action.payload.message : null,
      });
    case 'AUTH_LOGIN_REQUEST':
      return state;
    case 'AUTH_LOGIN_FAILURE':
      return state;
    case 'AUTH_LOGIN_SUCCESS':
      return Object.assign({}, state, {
        token: action.payload.token,
        message:action.payload.message
      });
    case 'AUTH_LOGOUT':
      console.log('logged out');
      return Object.assign({}, state, {
        token: null,
        message: null
      });
    default:
      return state;
  }
};

export default authenticateReducer
