import axios from 'axios';

import {ORG_API} from '../../apiconfig';

const USER_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(USER_TOKEN);
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addOrg = (organisation_Info, callback) => {
  return function(dispatch) {
    console.log("In addOrg.js\n",organisation_Info)
    dispatch({type: 'ADD_ORGANISATION_REQUEST'});    
    axios.post(ORG_API.ADD, organisation_Info)
      .then((response) => {
        console.log("In addOrg.js\n",response)
        dispatch({type: 'ADD_ORGANISATION_SUCCESS', payload: response.data});
        if (typeof callback === 'function') {
          callback(null, response.data);
        }
      })
      .catch((error) => {
        dispatch({type: 'ADD_ORGANISATION_FAILURE', payload: error.message});
        if (typeof callback === 'function') {
          callback(error.message);
        }
      });
  }
};