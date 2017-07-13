import axios from 'axios';

import {PATIENT_API} from '../../apiconfig';

const USER_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(USER_TOKEN);
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addPatientDetails = (queryData, callback) => {
  return function(dispatch) {
    //edit
    console.log("In addPatientDetails.js outside: \n",queryData);
    if(queryData.patient_id){
      console.log("In addPatientDetails.js edit: \n",queryData);
dispatch({type: 'EDIT_PATIENT_MEMBER_REQUEST'});
      axios.put(PATIENT_API.EDIT + queryData.patient_id, queryData.patient_info)
      .then((response)=>{
        dispatch({type: 'EDIT_PATIENT_SUCCESS', payload: response.data,newData: queryData.patient_info});
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
      console.log("In addPatientDetails.js\n",queryData.patient_info);
      dispatch({type: 'ADD_PATIENT_MEMBER_REQUEST'});
      axios.post(PATIENT_API.ADD, queryData.patient_info)
      .then((response)=>{
         console.log("In addPatientDetails.js response: \n",response);
        dispatch({type: 'ADD_PATIENT_SUCCESS', payload: response.data,newData: queryData.patient_info}); // Later put newData into payload
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