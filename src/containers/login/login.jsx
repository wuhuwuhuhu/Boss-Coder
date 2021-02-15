/*
    register login container
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
    Button} from 'antd-mobile'


import Logo from '../../components/logo/logo'

export default class Register extends Component {

    state = {
        username: '',
        password: '',
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    login = () =>{
        console.log(this.state)
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
        return(
            <div>
                <NavBar>Boss&nbsp;&&nbsp;Coder</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem placeholder='please input user name' onChange={val => {this.handleChange('username', val)}}>User Name:</InputItem>
                        <InputItem placeholder='please input password' onChange={val => {this.handleChange('password', val)}} type="password">Password:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.login}>Log In</Button>
                        <Button onClick={this.toRegister}>Register</Button>   
                        <WhiteSpace></WhiteSpace>
                    </List>                
                </WingBlank>

            </div>
        )
    }
}