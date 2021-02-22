/*
action creators: synchronous actions and asynchronous actions
*/
import io from 'socket.io-client'

import {AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, REVEIVE_MSG, READ_TARGET_MSG} from './action-types';
import {reqLogin, reqRegister, reqUpdateuser, reqUser, reqUserList, reqChatMsgList, reqReadMsg} from '../api';
import userList from '../components/user-list/user-list';

//user actions
//successfully authorized synchronous actions
const authsuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) =>({type: RECEIVE_USER, data: user})
export const resetUser = (msg) =>{io.socket.close(); return {type: RESET_USER, data: msg}}
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid} })
//receive one message
const receiveMsg = ({chatMsg, userid}) => ({type: REVEIVE_MSG, data: {chatMsg, userid}})
const readTargetMsg = ({count, from, to}) => ({type: READ_TARGET_MSG, data: {count, from, to}})


//userlist actions
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

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
            getMsgList(dispatch, result.data._id)
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
            getMsgList(dispatch,result.user._id)
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

//get user info asynchronous actin
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0) {
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}

//get userlist asynchronous action
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        //dispatch a synchronous action after get response
        if(result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}

//send msg asynchronous action 

/*Singleton:
ensure a class has only one instance, and provide a global point of access to it
encapsulated 'just-in-time initialization' or 'initialization on first use'
before instantialize: check whether the object exist, only instantialize when not
after: save instance
*/
function initIO(dispatch, userid){
    if(!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', function(chatMsg) {
            // console.log('client receive ', chatMsg)
            //filter related msg
            if(userid === chatMsg.from || userid === chatMsg.to)
            dispatch(receiveMsg({chatMsg, userid}))
        })
    }
    
}

//get msg list asyn
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code === 0){
       const {users, chatMsgs} = result.data
       dispatch(receiveMsgList({users, chatMsgs, userid}))

    }
}
export const updateMsgList = (userid) => {
    return dispatch => {
        getMsgList(dispatch, userid)
    }
}

export const sendMsg = (from, to ,content) => {
    return dispatch => {
        // console.log('send' ,{from, to, content})
        io.socket.emit('sendMsg',{from, to, content})
    }
}

export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if(result.code === 0){
            const count = result.data
            dispatch(readTargetMsg({count, from, to}))
        }
    }
}