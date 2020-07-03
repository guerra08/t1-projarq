import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import { updateLocalStorage } from '../../utils/access'

import './styles.css'

export default function Login() {
  const [code, setCode] = useState('')
  const [userType, setUserType] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      if (userType === 'admins') {
        if (code === '12345') {
          updateLocalStorage({ userType: 'admins', userId: '666', name: 'Admin' })
          history.push('/upload')
        }
        else {
          alert('Falha no login, tente novamente!')
        }
      }
      else {
        const res = await api.post(`/${userType}/login`, { code })
        if (res.status !== 200) {
          alert('Falha no logon, login novamente!')
        }
        else {
          updateLocalStorage({ userType: userType, userId: res.data.id, name: res.data.name })
          if (userType === 'students') {
            history.push('/create')
          }
          else if (userType === 'professors') {
            history.push('/evaluate')
          }
        }
      }
    } catch (error) {
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
            Realizar login
          </button>
          <button style={{ backgroundColor: '#37cd37' }} className="button" type="button" onClick={() => history.push('/rank')}>
            Ver ranking dos times
          </button>
        </form>
      </section>
    </div>
  )
}
