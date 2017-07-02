'use strict'
const subscriptionReducer = (state = {} , action) => { 
  switch (action.type) {     
    case 'PATIENT_ROW_SELECT':
    state.selectedPatientDetailsRow=state.selectedPatientDetailsRow||[];
      return  Object.assign({}, state, {        
        selectedPatientDetailsRow: [...state.selectedPatientDetailsRow,...action.payload]
      }); 
    break;
    case 'PATIENT_ROW_DESELECT':
      var filtered=[];
      if(state.selectedPatientDetailsRow && state.selectedPatientDetailsRow.length && action.payload){
        let allSelectedIds = action.payload.map((f)=>f.rowIdx);
        filtered=state.selectedPatientDetailsRow.filter(item => allSelectedIds.indexOf(item.rowIdx)==-1);  
      }
      return  Object.assign({}, state, {        
        selectedPatientDetailsRow: filtered.length?filtered:null
      }); 
    break;
     case 'TEAM_ROW_SELECT':
     state.selectedTeamDetailsRow=state.selectedTeamDetailsRow||[];
      return  Object.assign({}, state, {        
        selectedTeamDetailsRow: [...state.selectedTeamDetailsRow,...action.payload]
      }); 
    break;
    case 'TEAM_ROW_DESELECT':
     var filtered=[];
      if(state.selectedTeamDetailsRow && state.selectedTeamDetailsRow.length && action.payload){
          let allSelectedIds = action.payload.map((f)=>f.rowIdx);
          filtered=state.selectedTeamDetailsRow.filter(item => allSelectedIds.indexOf(item.rowIdx)==-1);  
      }
      return  Object.assign({}, state, {        
        selectedTeamDetailsRow: filtered.length?filtered:null
      }); 
    break;
    case 'DELETE_TEAM_MEMBER_SUCCESS':
    var teamIds=action.payload.data.map((f)=>{
        return f.row.team_member_id
      });
      var teamDetails = state.teamDetails.rows.filter((f)=> {
        return teamIds.indexOf(f.team_member_id) == -1 ;
      });
       state.teamDetails.rows= [];
      return Object.assign({},state,{
        teamDetails:{
          rows:[...teamDetails]
        }
      });
    break;
    case 'DELETE_PATIENT_MEMBER_SUCCESS':
      var patientIds=action.payload.data.map((f)=>{
        return f.row.patient_member_id
      });
      var patientDetails = state.patientDetails.rows.filter((f)=> {
        return patientIds.indexOf(f.patient_member_id) == -1 ;
      });
       state.patientDetails.rows= [];
      return Object.assign({},state,{
        patientDetails:{
          rows:[...patientDetails]
        }
      });
    break;
    case 'LOADING_TEAM_DATA_SUCCESS':
      return  Object.assign({}, state, {        
        teamDetails: action.payload
      }); 
      break;
      case 'TEAM_PAGE_CHANGED':
      return Object.assign({}, state, {

      });         
      break;
      case 'PATIENT_PAGE_CHANGED':
      return Object.assign({}, state, {

      });         
      break;
    case 'LOADING_PATIENT_DATA_SUCCESS':
      return  Object.assign({}, state, {
        patientDetails: action.payload
      }); 
      break;
    case 'HANDLE_GRIDROW_UPDATED':
      var oldState = state;
      state = Object.assign({},state,{patientDetails:{
        rows:action.payload.rows,
        columns:state.patientDetails.columns
      }, oldpatientDetails:oldState.patientDetails});
      return state;
      break;
      case 'TEAM_HANDLE_GRIDROW_UPDATED':      
         var oldState = state;
          state = Object.assign({},state,{teamDetails:{
            rows:action.payload.rows
          }, oldteamDetails:oldState.teamDetails});
          return state;
      break;
      case 'TEAM_HANDLE_GRIDROW_UPDATED_ERROR':
          state = Object.assign({},state,{
              teamDetails:Object.assign({},state.oldteamDetails)
          });
          return state;
      break;
      case 'HANDLE_GRIDROW_UPDATED_ERROR':
          state = Object.assign({},state,{
              patientDetails:Object.assign({},state.oldpatientDetails)
          });
          return state;
      break;
      case 'SHOW_TEAM_MODAL':    
            state.teamDetailsShowModal=true;        
            state.teamDetailsModalData = {action:action.payload};
            if(action.payload=="edit"){
              if(state.selectedTeamDetailsRow){
              state.teamDetailsModalData.selectedTeamDetailsRow=state.selectedTeamDetailsRow
              }else{
                state.teamDetailsShowModal=false;     
              }
            }
            state = Object.assign({},state);
            return state;
      break;
      case 'CLOSE_TEAM_MODAL':
            state.teamDetailsShowModal=false;
            state.selectedTeamDetailsRow = null;
            state = Object.assign({},state);
            return state;
      break;
      case 'SHOW_CONFIRM_MODAL':

            state.teamDelConfrimModal=true;
            state = Object.assign({},state);
            return state;
      break;      
      case 'SHOW_PATIENT_CONFIRM_MODAL':
            state.patientDelConfrimModal=true;
            state = Object.assign({},state);
            return state;
      break;
      case 'CLOSE_PATIENT_CONFIRM_MODAL':
            state.patientDelConfrimModal=false;
            state = Object.assign({},state);
            return state;
      break;
      case 'CLOSE_CONFIRM_MODAL':
            state.teamDelConfrimModal=false;
            state = Object.assign({},state);
            return state;
      break;
       case 'SHOW_PATIENT_MODAL':                 
            state.patientDetailsModalData = {action:action.payload};
            if(action.payload=="edit"){
              if(state.selectedPatientDetailsRow){
              state.patientDetailsModalData.selectedPatientDetailsRow=state.selectedPatientDetailsRow
              }else{
                state.patientDetailsShowModal=false;     
              }
            }
            state = Object.assign({},state);
            return state;
      break;
      case 'CLOSE_PATIENT_MODAL':
            state.patientDetailsShowModal=false;
            state = Object.assign({},state);
            return state;
      break;
       case 'SHOW_TEMPLATE_MODAL':           
           state.teamImportShowModal=true;
            state = Object.assign({},state);
            return state;
      break;
      case 'CLOSE_TEMPLATE_MODAL':
            state.teamImportShowModal=false;
            state = Object.assign({},state);
            return state;
      break;
      case 'ADD_ORGANISATION_SUCCESS':
      
      return state;
      break;
      case 'ADD_ORGANISATION_FAILURE':
        
        return state;
      break;
      case 'ADD_TEAM_MEMBER_REQUEST':
        state.teamDetailsShowModal = false;
        state = Object.assign({},state);
        return state;
      break;
      case 'ADD_PATIENT_MEMBER_REQUEST':
        state.patientDetailsShowModal = false;
        state = Object.assign({},state);
        return state;
      break;
      case 'OTHER_DETAILS_REQUEST':
      return state;
      case 'UPDATE_PATIENT_ASSIGNED_PHYSICIAN_SUCCESS':
        console.log('patientDetails',state.patientDetails);
        var tempRows = state.patientDetails.rows.map((item)=>{
           console.log('it' , item);
           if(action.payload && action.payload.row && 
           item.patient_member_id === action.payload.row.patient_member_id){
             item.assigned_physician_id = action.payload.physician;
           }
            return item;
        });
        
        state.patientDetails = Object.assign({},state.patientDetails, {
          rows:[...tempRows]
        });
        return Object.assign({}, state);
      break;
    case 'LOADING_PHYSICIANS_DATA_SUCCESS':
    state.assignedPhysicians = state.assignedPhysicians || [];
      state.assignedPhysicians  = [...action.payload];
      return state;
    break;
    default:
      return state;
  }
};

export default subscriptionReducer
