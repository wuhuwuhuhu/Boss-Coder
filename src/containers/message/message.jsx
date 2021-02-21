/*
Message route container
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief
function getLastMsgs(user, users, chatMsgs){
    const lastMsgObjs = {}
    chatMsgs.forEach(chat => {
        if(chat.to === user._id && !chat.read){
            chat.unReadCount = 1
        }else{
            chat.unReadCount = 0
        }
        
        const lastMsgObj = lastMsgObjs[chat.chat_id]
        if(!lastMsgObj){
            lastMsgObjs[chat.chat_id] = chat
        }else{
            if(lastMsgObj.create_time < chat.create_time){
                chat.unReadCount += lastMsgObjs[chat.chat_id].unReadCount
                lastMsgObjs[chat.chat_id] = chat
            }
            
        }
    })
    const lastMsgsArr = Object.values(lastMsgObjs)
    lastMsgsArr.sort(function (c1, c2) {
        return c2.create_time - c1.create_time
    })
    const lastMsgs = lastMsgsArr.map(msg => {
        const targetId = msg.from === user._id? msg.to: msg.from
        const targetAvatar = users[targetId].avatar
        const targetUsername = users[targetId].username
        const content = msg.content
        const unReadCount = msg.unReadCount
        return {
            targetId, targetAvatar, targetUsername, content, unReadCount
        }
    })
    return lastMsgs

}
class Message extends Component {
    render(){

        const {user} = this.props
        const {users, chatMsgs} = this.props.chat

        //classify chatMsgs by chat_id
        const lastMsgs = getLastMsgs(user, users, chatMsgs)

        return(
            <div>
                <List style={{marginTop:50 ,marginBottom:50}}>
                    {
                        lastMsgs.map(msg => (
                            <Item 
                            key = {msg.targetId}
                            className='messageItem'
                            extra={<Badge text={msg.unReadCount}></Badge>}
                            thumb={msg.targetAvatar}
                            arrow='horizontal'
                            onClick={() => this.props.history.push(`./chat/${msg.targetId}`)}
                            >{msg.content}<Brief>{msg.targetUsername}</Brief></Item>
                        ))
                    }
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        chat: state.chat 
    }),
    {}
)(Message)