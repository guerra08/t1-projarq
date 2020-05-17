import React from 'react'
import { Navbar } from 'react-bootstrap'
import { GrUserAdmin } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import './styles.css'

export default function ({ path, name }) {
  return (
    <Navbar fixed="top" expand="lg" variant="light">
      <GrUserAdmin size={30} className="icon" />
      <Link className="link" to={`/${path}`}>
        {name}
      </Link>
    </Navbar>
  )
}
