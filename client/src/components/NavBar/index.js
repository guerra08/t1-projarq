import React from 'react'
import { Navbar } from 'react-bootstrap'
import { FaUserTie, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Logout from '../Logout'
import './styles.css'

export default function ({ path, name, type }) {
  return (
    <Navbar fixed="top" expand="lg" variant="light">
      {type === 'admins' ? (
        <FaUserTie size={30} className="icon" />
      ) : (
        <FaUser size={30} className="icon" />
      )}
      <Link className="link" to={`/${path}`}>
        {name}
      </Link>
      <Logout></Logout>
    </Navbar>
  )
}
