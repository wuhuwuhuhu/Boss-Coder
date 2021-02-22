import React, {Component} from 'react'
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item
//get path in none route function
//withRoute

class Navfoot extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render(){
        let {navList, unReadCount} = this.props
        //filter nav which hide is true 
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname
        
        return(
            <div>
                <TabBar >
                    {
                        
                        navList.map((nav,index) => (
                            <Item key={nav.path}
                            badge={nav.path === '/message'? unReadCount:0}
                                title={nav.text}
                                icon={{uri: require(`./images/${nav.icon}.png`).default}}
                                selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`).default}}
                                selected={path === nav.path}
                                onPress={() => this.props.history.replace(nav.path)}
                                
                                ></Item>
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}
export default withRouter(Navfoot) //expose Navfoot to import route attributes: history, location, pathname