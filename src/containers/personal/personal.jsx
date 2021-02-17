/*
Personal route container
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
    logout= () => {
        Modal.alert('Log Out', 'Do you really want to log out?',[
            {
                text: 'Cancel',
            },
            {
                text: 'Log Out',
                onPress: () => {
                    //clear cookie
                    Cookies.remove('userid')
                    //clear redux
                    this.props.resetUser()

                }
            }
        ])
    }
    render(){
        const {username, type, avatar, company, info, post, salary} = this.props.user
        return(
            <div style={{marginBottom: 50, marginTop:50}}>
                <Result imgUrl={avatar}
                title={username}
                message={company}
                ></Result>
                <List renderHeader ={() => 'information'}>
                    <Item multipleLine>
                        <Brief>Job: {post}</Brief>
                        <Brief>Skills: {info}</Brief>
                        {salary?<Brief>Salary: {salary}</Brief> : null}
                        
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Button type='warning' onClick={this.logout}>Log Out</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user
    }),
    {resetUser}
)(Personal)