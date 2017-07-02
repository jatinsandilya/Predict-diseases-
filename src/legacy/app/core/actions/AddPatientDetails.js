'use strict';

import axios from 'axios';
import config from '../../../config'
import {PATIENT_API} from '../../apiconfig';

const USER_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(USER_TOKEN);
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addPatientDetails = (queryData, callback) => {
  return function(dispatch) {
    //edit
    if(queryData.patient_member_id){
dispatch({type: 'EDIT_PATIENT_MEMBER_REQUEST'});
      axios.post(PATIENT_API.EDIT + queryData.patient_member_id, queryData.patient_info)
      .then((response)=>{
        dispatch({type: 'EDIT_PATIENT_SUCCESS', payload: response.data});
        dispatch({type: 'SHOW_MODAL', payload:{currentModal:null}});
        if (typeof callback === 'function') {
           callback(null, response.data);
        }
      })
      .catch((error) => {
         dispatch({type: 'EDIT_PATIENT_FAILURE', payload: error.message});
         if (typeof callback === 'function') {
           callback(error.message);
        }
      });
    }
    //add PatientDetails
    else{
      dispatch({type: 'ADD_PATIENT_MEMBER_REQUEST'});
      axios.post(PATIENT_API.ADD, queryData.patient_info)
      .then((response)=>{
        dispatch({type: 'ADD_PATIENT_SUCCESS', payload: response.data});
         dispatch({type: 'SHOW_MODAL', payload:{currentModal:null}});
        if (typeof callback === 'function') {
           callback(null, response.data);
        }
      })
      .catch((error) => {
         dispatch({type: 'ADD_PATIENT_FAILURE', payload: error.message});
         if (typeof callback === 'function') {
           callback(error.message);
        }
      });
    }  
  }
};