/*
select user avatar
*/
import React, {Component} from 'react'
import {List, Grid, Button, WhiteSpace } from 'antd-mobile';
import axios from 'axios';
import PropTypes from 'prop-types';

import './avatar-selector.css'
export default class AvatarSelector extends Component {

    static propTypes = {
        setAvatar: PropTypes.func.isRequired
    }


    constructor(props) {
        super(props)
        
    }

    state = {
        icon: null, //icon address
        avatars: []
    }

    componentDidMount() {
        this.getAvatars()
    }

    getAvatars = () => {
        const url = 'https://tinyfac.es/api/users?min_quality=0'
        axios.get(url)
        .then(response => {
            const result = response.data
            const avatars = result.slice(0, 9).map(item => (
                {icon: item.avatars[0].url}))
            
            this.setState({
                avatars
            })
        })
        .catch(error => {
            //use local icons
            
            let avatars = []
            for(let i = 0; i < 9; i++){
                avatars.push({
                    text: i,
                    icon: require(`./icons/${i + 1}.png`).default
                })

            }
            this.setState({
                avatars
            })
        })
    }

    handleClick = ({icon}) => {
        //set state
        this.setState({
            icon
        })
        //set parent component state
        this.props.setAvatar(icon)
    }

    render(){
        
        const {icon} = this.state
        const listHeader = icon === null ? 'please select your profile picture' : (
            <div>
                selected profile picture: <img src={icon} width='100' height='100'></img>
            </div>
        )
        return(
            <div>
                <List renderHeader={() => listHeader}>
                <Grid data={this.state.avatars} columnNum={3} renderItem={dataItem => (
                        <div style={{ padding: '12.5px' }}>
                            <img src={dataItem.icon} style={{ width: '100px', height: '100px' }} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                            </div>
                        </div>
                        )}
                        onClick={this.handleClick}></Grid>
                    <WhiteSpace />
                    <Button onClick={this.getAvatars}>more pictures</Button><WhiteSpace />
                </List>
            </div>
        )
    }
}