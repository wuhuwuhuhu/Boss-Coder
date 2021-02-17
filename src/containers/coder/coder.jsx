/*
Coder route container
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list';
import {getUserList} from '../../redux/actions'

class Coder extends Component {
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render(){
        return(
            <div>
                <UserList userList={this.props.userList}></UserList>
            </div>
        )
    }
}

export default connect(
    state => ({userList: state.userList

    }),
    {getUserList}
)(Coder)