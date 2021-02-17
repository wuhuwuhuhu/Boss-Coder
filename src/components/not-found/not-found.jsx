import React, {Component} from 'react'
import {Button} from 'antd-mobile'
export default class  extends Component {
    render(){
        return(
            <div>
                <h2>404, Sorry, we lost!</h2>
                <Button type='primary' onClick={()=> this.props.histort.replace("/")}>Back to Main Page</Button>
            </div>
        )
    }
}