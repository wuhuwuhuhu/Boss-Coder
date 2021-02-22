import React, {Component} from 'react'
import { connect } from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'


import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item
class Chat extends Component {

    state = {
        content: '',
        isShowEmojis: false
    }


    constructor(props){
        super(props)
        const emojis = ["😀","😃","😄","😁","😆","😅","😂","🤣","🥲","☺️","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾"]
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }

    componentDidMount() {
        //scroll to bottom
        window.scrollTo(0, document.body.scrollHeight)

        //request read 
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }
    
    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)

    }

    componentWillUnmount(){
        //request read 
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }
    toggleShow = () => {
        const isShowEmojis = !this.state.isShowEmojis
        this.setState({isShowEmojis})
        if(isShowEmojis){
            setTimeout(() => {
                //to solve emojis display bug
                window.dispatchEvent(new Event('resize'))
            })
        }
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
            content: '',
            isShowEmojis: false
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
        if(!target) {
            return null
        }
        //filter chatMsgs
        //chatMsgs.filter(msg => msg.chat_id === chatId) //use chatId 
        //const msgs = chatMsgs.filter(msg => msg.from === targetId || msg.to === targetId)

        return(
            <div id='chat-page'>
                <NavBar 
                icon={<Icon type='left'></Icon>} 
                onLeftClick={() => this.props.history.goBack()}
                className='sticky-header'
                >{target.username}</NavBar>
                <List style={{marginTop: 50, marginBottom: 50,}}>
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

                <div className='am-tab-bar'>
                    <InputItem placeholder='please input here' 
                    value={this.state.content}
                    onChange={val => this.setState({content: val})} 
                    onFocus={() => this.setState({isShowEmojis: false})}
                    extra={<span>
                        <span onClick={this.toggleShow}>😂   </span>
                        <span onClick={this.handleSend}>send</span>
                    </span>
                    }></InputItem>
                    {this.state.isShowEmojis? (<Grid data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={(item) => {
                                this.setState({content: this.state.content + item.text})
                            }}
                            itemStyle={{"touch-action": "pan-y"}}
                            ></Grid>): null}
                
                </div>
            
            </div>
        )
    }
}
export default connect(
(state => ({user: state.user, chat: state.chat})),{sendMsg, readMsg}
)(Chat)