'use strict';

import axios from 'axios';
import config from '../../../config'
/*
 * Auth a user
 */
export function logoutHard() {
    return function (dispatch) {
        dispatch({type: 'AUTH_LOGOUT'});
    }
}