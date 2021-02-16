/*
action creators: synchronous actions and asynchronous actions
*/
import {AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER} from './action-types';
import {reqLogin, reqRegister, reqUpdateuser} from '../api';

//successfully authorized synchronous actions
const authsuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) =>({type: RECEIVE_USER, data: user})
const resetUser = (msg) =>({type: RESET_USER, data: msg})

//register asynchronous action
export const register = (user) => {

    // form check at front-end
    const {username, password, password2, type} = user
    if(!username || !password || !password2 || !type){
        return errorMsg("all fields must be filled")
    } 

    if(password !== password2) {
        return errorMsg("password and repeat password should be same")
    }
    // form passed front-end check, return an asychronous action function to do ajax request
    return async dispatch => {
        const response = await reqRegister({username, password, type})
        const result = response.data
        if(result.code === 0){
            //success
            dispatch(authsuccess(result.data))
        } else {
            //fail
            dispatch(errorMsg(result.msg))
        }
    }
}

//login asynchronous action
export const login = (user) => {
    // form check at front-end
    const {username, password} = user
    if(!username || !password){
        return errorMsg("all fields must be filled")
    } 

    // form passed front-end check, return an asychronous action function to do ajax request
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if(result.code === 0){
            //success
            dispatch(authsuccess(result.user))
        } else {
            //fail
            dispatch(errorMsg(result.msg))
        }
    }
}

//update asynchronous action
export const updateUser = (user) =>{
    return async dispatch => {
        const response = await reqUpdateuser(user)
        const result = response.data
        if(result.code === 0 ) {
            //update success
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}