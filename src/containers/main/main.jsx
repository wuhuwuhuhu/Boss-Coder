/*
    register main container 
*/
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import Cookies from 'js-cookie' //operate front-end cookie,set()/remove()
import {NavBar} from 'antd-mobile'
import BossInfo from '../boss-info/boss-info'
import CoderInfo from '../coder-info/coder-info';
import Boss from "../boss/boss";
import Coder from "../coder/coder";
import Message from "../message/message";
import Personal from "../personal/personal"
import NotFound from '../../components/not-found/not-found'
import Navfoot from '../../components/nav-footer/nav-foot'
import Chat from '../chat/chat'
import {getRedirectTo} from '../../utils'
import {getUser, updateMsgList} from "../../redux/actions";

class Main extends Component {

    //attribute component object
    navList = [//including all related data nav component needed
        {
            path: '/boss',
            component: Boss,
            title: "Coder List",
            icon: 'boss',
            text: 'coder'
        },
        {
            path: '/coder',
            component: Coder,
            title: "Boss List",
            icon: 'coder',
            text: 'boss'
        },
        {
            path: '/message',
            component: Message,
            title: "Message",
            icon: 'message',
            text: 'message'
        },
        {
            path: '/personal',
            component: Personal,
            title: "Personal Information",
            icon: 'personal',
            text: 'Personal'
        },
        

    ]
    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            this.props.getUser()
        }
    }

    render(){
        const {unReadCount} = this.props
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


        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)
        if(currentNav) {
            //hide boss or coder in navList
            if(user.type === 'boss'){
                navList[1].hide = true
            }else{
                navList[0].hide = true
            }
        }
        return(
            <div>
                {currentNav?<NavBar className='sticky-header'>{currentNav.title}</NavBar>: null}
                <Switch>
                    {
                        navList.map((nav, index) => <Route key={index} path={nav.path} component={nav.component}></Route> )
                    }
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/coderinfo' component={CoderInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                </Switch>
                {currentNav?<Navfoot navList = {navList} unReadCount={unReadCount}></Navfoot>: null}
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),{getUser, updateMsgList}
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