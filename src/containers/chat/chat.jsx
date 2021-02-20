import React, {Component} from 'react'
import { connect } from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'


import {sendMsg} from '../../redux/actions'

const Item = List.Item
class Chat extends Component {

    state = {
        content: ''
    }

    handleSend = () => {
        //collect data
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()

        //request to server
        if(content) {
            //asynchronously 
            this.props.sendMsg(from, to, content)
            
        }
        //clear input
        this.setState({
            content: ''
        })
    }
    render(){
        const {user} = this.props

        const {users, chatMsgs} = this.props.chat

        //calculate chatId
        const meId = user._id
        if(!users[meId]) {
            return null
        }
        const targetId = this.props.match.params.userid
        //const chatId = [meId, targetId].sort().join('-')
        const target = users[targetId]

        //filter chatMsgs
        //chatMsgs.filter(msg => msg.chat_id === chatId) //use chatId 
        //const msgs = chatMsgs.filter(msg => msg.from === targetId || msg.to === targetId)

        return(
            <div id='chat-page'>
                <NavBar>{target.username}</NavBar>
                <List>
                    {
                        chatMsgs.map(msg => {
                            if(msg.from === targetId){
                                
                                return <Item key={msg._id} thumb={target.avatar}>{msg.content}</Item>
                            } else if(msg.to === targetId) {
                                return <Item key={msg._id} className='chat-me' extra='me'>{msg.content}</Item>
                            }
                        })
                    }
                </List> 

                <div className='am-tar-bar'>
                    <InputItem placeholder='please input here' value={this.state.content}onChange={val => this.setState({content: val})} extra={<span onClick={this.handleSend}>send</span>}></InputItem>
                
                </div>
            
            </div>
        )
    }
}
export default connect(
(state => ({user: state.user, chat: state.chat})),{sendMsg}
)(Chat)