import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {checkAccess,cleanLocalStorage} from '../../utils/access'
import './styles.css'

export default function Logout(){

    const history = useHistory()

    function handleClick(){
        cleanLocalStorage()
        history.push('/')
    }

    return(
        <div className="logout-container">
            <p onClick={() => handleClick()}>Logout</p>
        </div>
    )

}