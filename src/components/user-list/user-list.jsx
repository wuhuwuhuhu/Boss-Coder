/*
render user list for specified type 
*/
import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body
class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render(){
        const {userList} = this.props
        return(
            <div>
                {/* add margrinBottom to avoid the bottom tab block userlist */}
                <WingBlank style={{marginBottom: 50, marginTop:50}}>
                    <QueueAnim type='alpha' delay={300} >
                        {
                            userList.map(user => (
                                <div key={user._id}>
                                    <WhiteSpace></WhiteSpace>
                                    <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                        <Header thumb={<img src = {user.avatar} style={{ width: '50px', height: '50px' }} alt={user.type}></img>} extra={user.username}></Header>
                                        <Body>
                                            {user.post ? <div>Jobs: {user.post}</div>: null}
                                            {user.company ? <div>Company: {user.company}</div>: null}
                                            {user.info ? <div>Skills: {user.info}</div>: null}
                                            {user.salary ? <div>Salary: {user.salary}</div>: null}
                                        </Body>
                                    </Card>
                                </div>
                            ))
                        }
                    </QueueAnim>
                </WingBlank>
            </div>
        )
    }
}

export default withRouter(UserList)