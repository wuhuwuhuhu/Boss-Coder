/*
reducer functions used to rturn a new state according the value of state
*/
import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, REVEIVE_MSG, READ_TARGET_MSG} from './action-types';

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

const initUserList = []
//reducer to operate userlist's stata
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}


const initChat = {
    users: {}, //all users [{userid: {username, avatar}}]
    chatMsgs:[], //user related msg
    unReadCount: 0
}

//reducer to generate chat status
function chat(state=initChat, action) {
    switch(action.type){
        case RECEIVE_MSG_LIST: //data: {users, chatMsgs}
            const {users, chatMsgs} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === action.data.userid?1: 0),0)
            }
        case REVEIVE_MSG: 
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid?1:0)
            }
        case READ_TARGET_MSG:
            const {count, from, to} = action.data
            return{
                users: state.users,
                chatMsgs: state.chatMsgs.map( msg => {
                    if(msg.from === from && msg.to === to && !msg.read){
                        return {...msg, read: true}
                    }else{
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}


export default combineReducers({
    user, userList, chat
})
//export an object: {xxx: 0, yyy: 0}

