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
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions';

class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    login = () =>{
        this.props.login(this.state)
    }

    //process input change
    handleChange = (name, val) => {

        //update state
        this.setState({
            [name]: val
        })
    }

    render(){
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
export default connect(
    state =>({user: state.user}),
     {login}
)(Login)