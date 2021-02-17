/*
    register main container 
*/
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import BossInfo from '../boss-info/boss-info'
import CoderInfo from '../coder-info/coder-info';
import Cookies from 'js-cookie' //operate front-end cookie,set()/remove()

import {getRedirectTo} from '../../utils'
import {getUser} from "../../redux/actions";

class Main extends Component {
    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            this.props.getUser()
        }
    }

    render(){

        //get userid from ciookie
        const userid = Cookies.get('userid')
        //if not login, redirect to login
        if(!userid){
            return <Redirect to='/login'></Redirect>
        }
        //get user from redux
        const {user} = this.props
        //if no user_id in redux retuen null
        if(!user._id){
            return null
        }
        //if user_id in redux,render corresponding page: according user.type and user.avatar == null? redirect
        else {
             let path = this.props.location.pathname
             if(path === '/'){
                 path = getRedirectTo(user.type, user.avatar)
                 return <Redirect to= {path}></Redirect>
             }
        }



        //check user whether login
        // const {user} = this.props
        // if(!user._id){
        //     return <Redirect to='/login'></Redirect>
        // }
        return(
            <div>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/coderinfo' component={CoderInfo}></Route>
                </Switch>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),{getUser}
)(Main)

/*
1. implement auto login
    1). if there is userid in cookie, request the user info
    2). else redirect to login 

2. if user has loged in and request '/'
    1). if user._id in redux
        according user.type and user.avatar == null? redirect
    2). if not
        request user info asynchronous
*/