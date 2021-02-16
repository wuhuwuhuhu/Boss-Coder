/*
reducer functions used to rturn a new state according the value of state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG} from './action-types';

const initUser = {
    username: '', //username
    type: '', //user type coder/boss
    msg: '', //error msg
    redirectTo: '' //new route
}

function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data is user
            return {...action.data, redirectTo: '/'}
        case ERROR_MSG: //data is msg
            return {...state, msg: action.data}
        default:
           return state
    }
    
}



export default combineReducers({
    user
})
//export an object: {xxx: 0, yyy: 0}