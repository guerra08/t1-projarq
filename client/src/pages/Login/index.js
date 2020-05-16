import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

export default function Login() {
  const [code, setCode] = useState('')
  const [userType, setUserType] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const res = await api.post(`/${userType}/login`, { code })
      localStorage.setItem('userId', `${res.data.id}`)
      localStorage.setItem('userType', `${userType}`)
      localStorage.setItem('name', `${res.data.name}`)
      if(userType === 'students'){
        history.push('/create')
      }
      else if(userType === 'professors'){
        history.push('/evaluate')
      }
      else if(userType === 'admin'){
        //Admin routes
      }
    } catch (error) {
      console.log(error)
      alert('Falha no logon, tente novamente!')
    }
  }

  async function setUser(e) {
    await setUserType(e.target.value)
  }

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>

          <input
            className="input"
            placeholder="Seu código"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="option" onChange={(e) => setUser(e)}>
            <div className="professors">
              <input type="radio" value="professors" name="option" />
              <p className="color">Professor</p>
            </div>
            <div className="students">
              <input type="radio" value="students" name="option" />
              <p className="color">Aluno</p>
            </div>
            <div className="admins">
              <input type="radio" value="admins" name="option" />
              <p className="color">Admin</p>
            </div>
          </div>

          <button className="button" type="submit">
            Entrar
          </button>
        </form>
      </section>
    </div>
  )
}
