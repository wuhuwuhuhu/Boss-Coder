/*
    register route container
    author: whd
    2021-02-14
*/
import React, {Component} from 'react'
import {
    NavBar, 
    WingBlank, 
    List, 
    InputItem,
    WhiteSpace,
    Radio,
    Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions';
const ListItem = List.Item

class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        usertype: ''
    }

    toLogin = () => {
        // this.props.history.push('/register')
        this.props.history.replace('/login')
    }

    register = () =>{
        // console.log(this.state)
        this.props.register(this.state)
    }

    //process input change
    handleChange = (name, val) => {

        //update state
        this.setState({
            [name]: val
        })
    }

    render(){
        const {type} = this.state
        const {msg, redirectTo} = this.props.user
        //if redirectTo is not empty, then need redirect to new route
        if(redirectTo){
            return <Redirect to={redirectTo}></Redirect>
        }
        return(
            <div>
                <NavBar>Boss&nbsp;&&nbsp;Coder</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <InputItem placeholder='please input user name' onChange={val => {this.handleChange('username', val)}}>User Name:</InputItem>
                        <InputItem placeholder='please input password' onChange={val => {this.handleChange('password', val)}} type="password">Password:</InputItem>
                        <InputItem placeholder='please repeat password' onChange={val => {this.handleChange('password2', val)}} type="password">Password:</InputItem>
                    <ListItem>
                    <span>User Type</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio checked={type === 'boss'} onChange={val => {this.handleChange('type', 'boss')}}>Boss</Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio checked={type === 'coder'} onChange={val => {this.handleChange('type', 'coder')}}>Coder</Radio>
                    </ListItem> 
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>Register</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.toLogin}>Registered?</Button>   
                    </List>                
                </WingBlank>

            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),{register}
)(Register)