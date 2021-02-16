/*
reducer functions used to rturn a new state according the value of state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from './action-types';

import {getRedirectTo} from '../utils'

const initUser = {
    username: '', //username
    type: '', //user type coder/boss
    msg: '', //error msg
    redirectTo: '' //new route
}

function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data is user
            return {...action.data, redirectTo: getRedirectTo(action.data.type, action.data.avatar)}
        case ERROR_MSG: //data is msg
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
           return state
    }
    
}



export default combineReducers({
    user
})
//export an object: {xxx: 0, yyy: 0}

