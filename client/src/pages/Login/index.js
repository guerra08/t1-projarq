import React, { useState } from 'react'
// import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

// import api from '../../services/api'

import './styles.css'

export default function Logon() {
  const [id, setId] = useState('')
  const [userType, setUserType] = useState('')
  // const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    // try {
    //   const response = await api.post('sessions', { id, userType })

    //   localStorage.setItem('userId', id)
    //   localStorage.setItem('userName', response.data.name)

    //   history.push('/anotherpage')
    // } catch (err) {
    //   alert('Falha no login, tente novamente.')
    // }
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
            placeholder="Seu ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <div className="option" onChange={(e) => setUser(e)}>
            <div className="professor">
              <input type="radio" value="professor" name="option" />
              Professor
            </div>
            <div className="student">
              <input type="radio" value="student" name="option" />
              Aluno
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
