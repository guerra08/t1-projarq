import React from 'react'
import { Navbar } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './styles.css'

export default function ({ path, name }) {
  return (
    <div className="deniedContainer">
      <MdClose size={100} color="#FF3B30" />
      <span className="text">Acesso Negado!</span>
    </div>
  )
}
