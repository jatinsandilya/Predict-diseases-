import axios from 'axios';

import {AUTH_API} from '../../apiconfig';

/*
 * Auth a  user
 */
export const appLogin = (user, callback) => {
  return function(dispatch) {
    dispatch({type: 'AUTH_LOGIN_REQUEST'});
    axios.post(AUTH_API.LOGIN, user)
      .then((response) => {
        dispatch({type: 'AUTH_LOGIN_SUCCESS', payload: response.data});
        if (typeof callback === 'function') {
          callback(null, response.data);
        }
      })
      .catch((error) => {
        dispatch({type: 'AUTH_LOGIN_FAILURE', payload: error.response.data});
        if (typeof callback === 'function') {
          callback(error.response.data);
        }
      });
  }
};
