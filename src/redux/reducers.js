/*
reducer functions used to rturn a new state according the value of state
*/
import {combineReducers} from 'redux'

function xxx(state=0, action){
    return state
}

function yyy(state=0, action){
    return state
}

export default combineReducers({
    xxx,yyy
})
//export an object: {xxx: 0, yyy: 0}