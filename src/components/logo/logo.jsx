import { func } from 'prop-types'
import React from 'react'

import logo from './logo.png'
import './logo.css'
export default function Logo(){
    return(
        <div className="logo">
            <img src={logo} alt="logo" className='logo-img'/>
            <p className='author'>By whd</p>
        </div>
    )
}