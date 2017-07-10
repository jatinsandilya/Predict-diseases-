import toastr from 'toastr';
import store from '../store';

/*
* all these helper functions are for checking route authorization & log out purposes
* */


/**
 * check user authentication from react router
 * @param nextState
 * @param replaceState
 * @returns void
 */


export function isDashAuthRouter(nextState, replaceState) {
	if (!store.getState().auth.token || !(store.getState().auth.user_role==="Admin")) {
		toastr.warning('You have no Access right for this feature.');
		replaceState('/app');
	}
}


export function checkUserType(nextState, replaceState) {
	if (!store.getState().auth.token  || !store.getState().auth.access_token) {
		toastr.warning('Need to login.');
		replaceState('/login');
	}
    if(store.getState().auth.user_role ==="Admin"){
			replaceState('/dashboard');
    }
}


export function isAuthRouter(nextState, replaceState) {
	if (!store.getState().auth.token) {
		toastr.warning('Need to login.');
		replaceState('/login');
	}
}



/**
 * check guest from react router
 * @param nextState
 * @param replaceState
 * @returns void
 */
export function isLoggedIn(nextState, replaceState) {
	if (store.getState().auth.token) {
		toastr.info('Already login');
		replaceState('/subscription');
	}
}
