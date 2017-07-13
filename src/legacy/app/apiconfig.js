export const BASE_URL= 'http://localhost:3000';
export const API_URL= 'http://35.164.141.147:9000';
export const AUTH_API = {
  LOGIN : API_URL+'/api/login'
} 
export const TEAM_API={
  LOAD:API_URL+'/api/organisation_details/team_members/pagination/',
  ADD:API_URL+'/api/organisation_details/team_members',
  EDIT:API_URL+'/api/organisation_details/team_members/edit/',
  DELETE:API_URL+'/api/organisation_details/team_members/delete'
}
export const PATIENT_API={
  LOAD:API_URL+'/api/organisation_details/patient_members/pagination/',
  ADD:API_URL+'/api/organisation_details/patient_members',
  EDIT:API_URL+'/api/organisation_details/patient_members/edit/',
  DELETE:API_URL+'/api/organisation_details/patient_members/delete'
}
export const ORG_API={
  ADD:API_URL+'/api/organisation_details',
  TYPE:API_URL+'/api/organisation_details/organisation_type'
}
export const OTHER_DETAILS_API={
  ADD:API_URL+'/api/organisation_details/other_details'
}