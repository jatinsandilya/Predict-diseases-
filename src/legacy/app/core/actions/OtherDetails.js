'use strict';

import axios from 'axios';
import config from '../../../config'
import {OTHER_DETAILS_API} from '../../apiconfig';

export const saveOtherDetails = (queryData, callback) => {
  return function(dispatch) {
    //submit other details   
      dispatch({type: 'OTHER_DETAILS_REQUEST'});
      axios.post(OTHER_DETAILS_API.ADD, queryData.other_details)
      .then((response)=>{
        dispatch({type: 'OTHER_DETAILS_SUCCESS', payload: response.data});
        if (typeof callback === 'function') {
           callback(null, response.data);
        }
      })
      .catch((error) => {
         dispatch({type: 'OTHER_DETAILS_FAILURE', payload: error.message});
         if (typeof callback === 'function') {
           callback(error.message);
        }
      });
  }
};