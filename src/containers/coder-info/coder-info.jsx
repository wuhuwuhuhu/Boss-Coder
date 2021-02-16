/*
coder info route container
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

import {updateUser} from '../../redux/actions';

class CoderInfo extends Component {
    state = {
        avatar: '',
        post: '',
        info: '',

    }

    setAvatar = (avatar) => {
        this.setState({
            avatar
        })
    }

    handleChange = (name, value) => {
        
        this.setState({
            [name]: value
        })
    }

    save =() => {
        this.props.updateUser(this.state)
    }

    render(){
        //if info has been filled. redirect to corresponding page
        const {avatar, type} = this.props.user
        if(avatar) {
            const path = type === 'coder' ? '/coder': '/boss'
            return <Redirect to={path}></Redirect>
        }
        return(
            <div>
                <NavBar>Job preferences</NavBar>
                <AvatarSelector setAvatar={this.setAvatar} ></AvatarSelector>
                <InputItem placeholder='please input job title' onChange={val => this.handleChange('post', val)}>Job Title</InputItem>
                <TextareaItem title='Skills' rows={3} placeholder='Skills&amp;Endorsements' onChange={val => this.handleChange('info', val)}></TextareaItem>
                <Button type='primary' onClick={this.save}>SAVE</Button>
            </div>
        )
    }
}

export default connect(
    state =>({user: state.user}),
    {updateUser}
)(CoderInfo)