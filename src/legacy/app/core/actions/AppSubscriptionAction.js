'use strict';
import React from 'react';
import axios from 'axios';
import {PATIENT_API,TEAM_API} from '../../apiconfig';
const USER_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(USER_TOKEN);
axios.defaults.headers.post['Content-Type'] = 'application/json';
/*
 * Auth a user
 */
export const appSubscription = (user, callback) => {  
  return function(dispatch) {
    //create subscription action creater here
    dispatch({type: 'AUTH_SUBSCRIPTION_REQ'});
  }
};

export const onTeamRowSelect=(rowObj) =>{
  return function(dispatch) {

    dispatch({type: 'TEAM_ROW_SELECT',payload:rowObj});
  }
}

export const onTeamRowDeSelect=(rowObj) =>{
  return function(dispatch) {
    dispatch({type: 'TEAM_ROW_DESELECT',payload:rowObj});
  }
}

export const onPatientRowSelect=(rowObj) =>{
  return function(dispatch) {
    dispatch({type: 'PATIENT_ROW_SELECT',payload:rowObj});
  }
}

export const onPatientRowDeSelect=(rowObj) =>{
  return function(dispatch) {
    dispatch({type: 'PATIENT_ROW_DESELECT',payload:rowObj});
  }
}

export const onTeamPageSelect = (page, callback) => {   
  return function(dispatch) {    
    dispatch({type: 'TEAM_PAGE_CHANGED',payload:page});
  }
};

export const onPatientPageSelect=(page,callback)=>{
  return function(dispatch) {    
    dispatch({type: 'PATIENT_PAGE_CHANGED',payload:page});
  }
};

export const handleGridRowsUpdated = (data,callback) => {
    return function(dispatch) {
        //row updated on api
        //
        dispatch({type: 'HANDLE_GRIDROW_UPDATED',payload:data});
        var id = data.patient_member_id;
        // console.log(rows);
         axios.put(PATIENT_API.EDIT+`${id}`, data).then((res)=>{
            //show msg
            console.log('successful update');

        })
        .catch((err)=>{ 
            //show err
            console.log('failed update');
            dispatch({type: 'HANDLE_GRIDROW_UPDATED_ERROR',payload:data});

        })
    }
};

export const updatePatientsAssignedPhysician = (rowValue, physician) => { // Works
        rowValue.physician_id = physician
  return function(dispatch){
    //  dispatch({type: 'UPDATE_PATIENT_ASSIGNED_PHYSICIAN_BEGIN',payload:data});
          var id = rowValue.patient_id;
          console.log("In AppSubActions.js\n");
          console.log(rowValue,physician)
         axios.put(PATIENT_API.EDIT+`${id}`, rowValue).then((res)=>{
            //show msg
            console.log('successful update');
            dispatch({type: 'UPDATE_PATIENT_ASSIGNED_PHYSICIAN_SUCCESS',payload:{row:rowValue,physician:physician}});

        })
        .catch((err)=>{ 
            //show err
            console.log('failed update');
            dispatch({type: 'HANDLE_GRIDROW_UPDATED_ERROR',payload:rowValue});

        })

            // dispatch({type: 'UPDATE_PATIENT_ASSIGNED_PHYSICIAN_SUCCESS',payload:{row:rowValue,physician:physician}});
        
        
  }
}

export const teamHandleGridRowsUpdated = (data, callback) => {
    return function(dispatch) {
        //row updated on api
        dispatch({type: 'TEAM_HANDLE_GRIDROW_UPDATED',payload:data});
        var id = data.team_member_id;
         axios.put(TEAM_API.EDIT+`${id}`, data).then((res)=>{
            //show msg
            console.log('successful updated team member.');

        })
        .catch((err)=>{
            //show err
            console.log('failed update');
            dispatch({type: 'TEAM_HANDLE_GRIDROW_UPDATED_ERROR',payload:data});
        })
    }
};

export const loadAssignedPhysicians = ()=>{
    return function(dispatch) {
    dispatch({type: 'LOADING_PHYSICIANS_DATA_REQUEST'}); 
    //   var URL= `http://35.164.141.147:9000/api/assignedPhysicians`;
    //     axios.get(URL).then((res)=>{
    //           var response = {
    //               rows:JSON.parse(res.data.data),                  
    //               activePage:currPage
    //           }
    // }).catch((error) => {
    //   console.log('error ' + error);
    // });
        var response = [{
	 name:'Physician1',
	 value:1
	},
	{
		name:  'Physician2',
		value:2
	 },
	 {
		 name: 'Physician3',
		 value:3
	 }];
        dispatch({type: 'LOADING_PHYSICIANS_DATA_SUCCESS',payload:response});
    
  }
}

export const loadPatientData = (currPage=1,pageSize=10) => {
  return function(dispatch) {
    dispatch({type: 'LOADING_PATIENT_DATA_REQUEST'}); 
    var URL= PATIENT_API.LOAD+`${currPage}/${pageSize}`;
      axios.get(URL).then((res)=>{
        console.log(res.data.data);
            var response = {
                rows:(res.data.data),                  
                activePage:currPage
            }
       dispatch({type: 'LOADING_PATIENT_DATA_SUCCESS',payload:response});
   }).catch((error) => {
     console.log('error :',error);
  });
  }
};

export const loadTeamData = (currPage=1,pageSize=10) => {  
  return function(dispatch) {
    //create subscription action creater here
    dispatch({type: 'LOADING_TEAM_DATA_REQUEST'});
  var URL= TEAM_API.LOAD+`${currPage}/${pageSize}`;
axios.get(URL).then((res)=>{
           var response = {
                 rows:JSON.parse(res.data.data),
                 activePage:currPage
            }     
     dispatch({type: 'LOADING_TEAM_DATA_SUCCESS',payload:response});
  })
 .catch((error) => {
     console.log('error :',error);
  });   
  }
};

export const deleteTeamRows = (rows)=>{
  console.log('going to delete', rows);
}
export const deletePatientRows = (rows)=>{
  console.log('going to deletePatientRows delete', rows);
}

export const showTeamModal = (data) => {
  console.log('in show team modal', data);
  return function(dispatch) {    
    //create subscription action creater here
    dispatch({type: 'SHOW_TEAM_MODAL', payload:data});
    dispatch({type: 'SHOW_MODAL', payload:{currentModal:'TEAM_MODAL'}});
  }};
  export const closeTeamModal = () => {
  return function(dispatch) {  
    //create subscription action creater here
   // dispatch({type: 'CLOSE_TEAM_MODAL'});
    //dispatch({type: 'SHOW_MODAL', payload:{currentModal:false}});
  }};

 export const closeModal = () => {
  return function(dispatch) {  
    dispatch({type: 'SHOW_MODAL', payload:{currentModal:null}});
  }};

  export const showConfirmModal = (data) => {
  return function(dispatch) {    
    dispatch({type: 'SHOW_CONFIRM_MODAL', payload:data});
    //dispatch({type: 'SHOW_MODAL', payload:{currentModal:'CONFIRM_MODAL'}});
  }};

 export const closeConfirmModal = () => {
  return function(dispatch) {  
    dispatch({type: 'CLOSE_CONFIRM_MODAL'});
  }};

  export const showConfirmPatientModal = (data) => {
  return function(dispatch) {    
    dispatch({type: 'SHOW_PATIENT_CONFIRM_MODAL', payload:data});
    //dispatch({type: 'SHOW_MODAL',payload:{currentModal:'CONFIRM_MODAL'}});
  }};

  export const closePatientConfirmModal = () => {
  return function(dispatch) {  
    dispatch({type: 'CLOSE_PATIENT_CONFIRM_MODAL'});
  }};

  export const showPatientModal = (data) => {
  return function(dispatch) {    
    //create subscription action creater here
    dispatch({type: 'SHOW_PATIENT_MODAL', payload:data});
    dispatch({type: 'SHOW_MODAL', payload:{currentModal:'PATIENT_MODAL'}});
  }};

 export const closePatientModal = () => {
  return function(dispatch) {  
    //create subscription action creater here
    //dispatch({type: 'CLOSE_PATIENT_MODAL'});
    // dispatch({type: 'SHOW_MODAL', payload:{currentModal:false}});
  }};

  export const  openTemplatePatientModal = () => {
  return function(dispatch) {    
    //create subscription action creater here
    dispatch({type: 'SHOW_TEMPLATE_MODAL'});
    dispatch({type: 'SHOW_MODAL', payload:{currentModal:'TEMPLATE_EXCEL_MODAL'}});
  }};

  export const closeTemplateModal = () => {
  return function(dispatch) {  
    //create subscription action creater here
    dispatch({type: 'CLOSE_TEMPLATE_MODAL'});
  }};

  
  
  export const teamRecordDelConfirm = (data) => {
  return function(dispatch) {  
      console.log(data);
      if(data && data.length>0){
       let patientIds = data.map((f)=>{
        return f.row.team_member_id
      })
       console.log(patientIds);
      let queryData={"team_member_ids":patientIds}; // No team_member_ids field in api
      axios.post(TEAM_API.DELETE,queryData)
        .then((response)=>{
          dispatch({type: 'DELETE_TEAM_MEMBER_SUCCESS', payload: {data:data,response:response.data}});
        })
        .catch((error) => {
           dispatch({type: 'DELETE_TEAM_MEMBER_FAILURE', payload: error.message});
        });
         //dispatch({type: 'SHOW_MODAL', payload:{currentModal:null}});
        dispatch({type: 'CLOSE_CONFIRM_MODAL'});
        dispatch({type: 'TEAM_ROW_DESELECT',payload:data});
    }
  }};

export const patientRecordDelConfirm = (data) => {
  return function(dispatch) {  
    if(data && data.length>0){
      let patientIds = data.map((f)=>{
        return f.row.patient_id
      })
      console.log(patientIds)
      const queryData={ patient_ids :patientIds};
      axios.delete(PATIENT_API.DELETE,{ data : queryData})
        .then((response)=>{
          console.log("DELETE response:\n",response);
          dispatch({type: 'DELETE_PATIENT_MEMBER_SUCCESS', payload: {data:data,response:response.data}});
        })
        .catch((error) => {
           dispatch({type: 'DELETE_PATIENT_MEMBER_FAILURE', payload: error.message});
        });
        dispatch({type: 'CLOSE_PATIENT_CONFIRM_MODAL'});
        dispatch({type: 'PATIENT_ROW_DESELECT',payload:data});
    }
  }};