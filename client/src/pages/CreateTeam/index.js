import React, { useState, useEffect } from 'react'
// import User from '../../components/User'
import './styles.css'
import Select from 'react-select'
import { Alert } from 'react-bootstrap'
import { TiDelete } from 'react-icons/ti'

import avatar0 from '../../assets/avatar0.svg'
import avatar1 from '../../assets/avatar1.svg'
import avatar2 from '../../assets/avatar2.svg'
import avatar3 from '../../assets/avatar3.svg'
import avatar4 from '../../assets/avatar4.svg'

export default function CreateTeam() {
  const [selectedUsers, setSelectedUsers] = useState([])

  const data = [
    {
      id: 1,
      name: 'Bruno Guerra',
      code: '123456789',
      email: 'gguerrabruno@outlook.com',
      phone: '998877665544',
      course_id: 1,
      course_name: 'Engenharia de Software',
      course_building: 32,
    },
    {
      id: 2,
      name: 'Pedro',
      code: '123456789',
      email: 'gguerrabruno@outlook.com',
      phone: '998877665544',
      course_id: 1,
      course_name: 'Engenharia de Software',
      course_building: 32,
    },
    {
      id: 3,
      name: 'Joao',
      code: '123456789',
      email: 'gguerrabruno@outlook.com',
      phone: '998877665544',
      course_id: 1,
      course_name: 'Engenharia da Computação',
      course_building: 32,
    },
    {
      id: 4,
      name: 'Rizzotto',
      code: '123456789',
      email: 'gguerrabruno@outlook.com',
      phone: '998877665544',
      course_id: 1,
      course_name: 'Engenharia da Computação',
      course_building: 32,
    },
    {
      id: 5,
      name: 'Lessa',
      code: '123456789',
      email: 'gguerrabruno@outlook.com',
      phone: '998877665544',
      course_id: 1,
      course_name: 'Engenharia da Computação',
      course_building: 32,
    },
  ]

  useEffect(() => {
    handleData()
  }, [])

  function handleData() {
    let users = []
    data.map((user) => {
      user['avatar'] = getRandomSvg()
      users.push({ value: user, label: user.name })
    })

    return users
  }

  async function handleChange(selected) {
    // console.log(selected.value)
    let val = false
    selectedUsers.map((user) => {
      if (user.id === selected.value.id) {
        val = true
      }
    })
    if (!val) await setSelectedUsers([...selectedUsers, selected.value])
  }

  function changeButton() {
    let bool = false
    if (selectedUsers.length >= 2) {
      // console.log(selectedUsers[0])
      let name = selectedUsers[0].course_name
      for (let i = 1; i < selectedUsers.length; i++) {
        name !== selectedUsers[i].course_name ? (bool = true) : (bool = false)
      }
    }

    return bool
  }

  function getRandomSvg() {
    let vector = [avatar0, avatar1, avatar2, avatar3, avatar4]
    return vector[Math.floor(Math.random() * 5)]
  }

  async function handleClick(userId) {
    await setSelectedUsers(selectedUsers.filter((user) => user.id !== userId))
  }

  return (
    <div className="teamContainer">
      <div className="select">
        {selectedUsers.length > 4 ? (
          <Alert variant="danger">Equipe Cheia!</Alert>
        ) : (
          <Select
            onChange={(selected) => handleChange(selected)}
            options={handleData()}
            placeholder="Selecione um Aluno"
          />
        )}
      </div>

      <div className="users">
        {selectedUsers.map((user) => (
          <div key={user.id} className="userContainer">
            <div className="user">
              <button
                className="removeUser"
                onClick={() => handleClick(user.id)}
              >
                <TiDelete size={48} color="#FF3B30" />
              </button>
              <img alt="img" src={user.avatar}></img>
              <p>{user.name}</p>
              <p>{user.course_name}</p>
            </div>
          </div>
        ))}
      </div>
      {changeButton() ? (
        <button className="button">Criar Time</button>
      ) : (
        <div>
          <p className="disabled">
            Pelo menos 2 participantes de cursos distintos
          </p>
          <button className="unavailable" disabled="true">
            Indisponível
          </button>
        </div>
      )}
    </div>
  )
}
