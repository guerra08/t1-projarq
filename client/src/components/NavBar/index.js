import React from 'react'
import { Navbar } from 'react-bootstrap'
import { GrUserAdmin, GrUser } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Logout from '../Logout'
import './styles.css'

export default function ({ path, name, type }) {
  return (
    <Navbar fixed="top" expand="lg" variant="light">
      {(type === 'admins') ? <GrUserAdmin size={30} className="icon"/> : <GrUser size={30} className="icon"/>}
      <Link className="link" to={`/${path}`}>
        {name}
      </Link>
      <Logout></Logout>
    </Navbar>
  )
}
