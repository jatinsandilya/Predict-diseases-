// module constants

/*
*  for login we don't require all kinds of state info, 
*  because it'll bypass middleware and we cannot set redux-thunk for this case.
* */

export const USER_AUTH = 'USER_AUTH';
export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_AUTH_PENDING = 'USER_AUTH_PENDING';
export const USER_AUTH_RESOLVED = 'USER_AUTH_RESOLVED';
export const USER_AUTH_REJECTED = 'USER_AUTH_REJECTED';
export const USER_AUTH_NOT_FOUND = 'USER_AUTH_NOT_FOUND';

export const USER_LOGOUT = 'USER_LOGOUT';