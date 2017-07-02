'use strict';

import axios from 'axios';
import config from '../../../config';
import {TEAM_API} from '../../apiconfig';

const USER_TOKEN = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(USER_TOKEN);
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addTeamDetails = (queryData, callback) => {
  return function(dispatch) {
    if(queryData.team_member_id){
      //edit
      dispatch({type: 'EDIT_TEAM_MEMBER_REQUEST'});
          axios.post(TEAM_API.EDIT+queryData.team_member_id, queryData.team_info)
            .then((response)=>{
              dispatch({type: 'EDIT_TEAM_MEMBER_SUCCESS', payload: response.data});
              dispatch({type: 'SHOW_MODAL', payload:{currentModal:null}});
              if (typeof callback === 'function') {
                callback(null, response.data);
              }
            })
            .catch((error) => {
              dispatch({type: 'EDIT_TEAM_MEMBER_FAILURE', payload: error.message});
              if (typeof callback === 'function') {
                callback(error.message);
              }
            });
    }
    else{
      //add
      dispatch({type: 'ADD_TEAM_MEMBER_REQUEST'});
          axios.post(TEAM_API.ADD, queryData.team_info)
            .then((response)=>{
              dispatch({type: 'ADD_TEAM_MEMBER_SUCCESS', payload: response.data});
              dispatch({type: 'SHOW_MODAL', payload:{currentModal:null}});
              if (typeof callback === 'function') {
                callback(null, response.data);
              }
            })
            .catch((error) => {
              dispatch({type: 'ADD_TEAM_MEMBER_FAILURE', payload: error.message});
              if (typeof callback === 'function') {
                callback(error.message);
              }
            });
    }
    
  }
};