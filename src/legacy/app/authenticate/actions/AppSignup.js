import axios from 'axios';
import config from '../../../config'
/*
 * Auth a user
 */
export const appSignup = (user, callback) => {
  return function(dispatch) {
    dispatch({type: 'AUTH_SIGNUP_REQUEST'});
    axios.post(config.API_URL+'signup', user)
      .then((response) => {
        dispatch({type: 'AUTH_SIGNUP_SUCCESS', payload: response.data});
        if (typeof callback === 'function') {
          callback(null, response.data);
        }
      })
      .catch((error) => {
        dispatch({type: 'AUTH_SIGNUP_FAILURE', payload: error.response.data});
        if (typeof callback === 'function') {
          callback(error.response.data);
        }
      });
  }
};