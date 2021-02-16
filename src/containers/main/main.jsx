/*
    register main container 
*/
import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import BossInfo from '../boss-info/boss-info'
import CoderInfo from '../coder-info/coder-info';

class Main extends Component {
    render(){
        //check user whether login
        const {user} = this.props
        if(!user._id){
            return <Redirect to='/login'></Redirect>
        }
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
    state => ({user: state.user})
)(Main)