import axios from 'axios';

// Request:  
// curl -H "Authorization: Bearer dda67c8ded86c5c3e4374a863c9c52521d60ae14ccb8" -H  "Content-Type: application/json" -d {} -X 
//DELETE  http://35.164.141.147:9000/api/organisation_details/patient_members/delete/1 
// Response: 
// {"message": "Data deleted."} 

const USER_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(USER_TOKEN);
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const confirmModal = (patientInfo,callback) =>{
    return function(dispatch) {
    // dispatch({type: 'DELETE_PATIENT_MEMBER_REQUEST'});
    //   axios.post('http://35.164.141.147:9000/api/organisation_details/patient_members/delete/'+patientInfo)
    //   .then((response)=>{
    //     dispatch({type: 'DELETE_PATIENT_SUCCESS', payload: response.data});
    //     if (typeof callback === 'function') {
    //        callback(null, response.data);
    //     }
    //   })
    //   .catch((error) => {
    //      dispatch({type: 'DELETE_PATIENT_FAILURE', payload: error.message});
    //      if (typeof callback === 'function') {
    //        callback(error.message);
    //     }
    //   });
  }
}