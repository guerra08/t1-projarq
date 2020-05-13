import React, { useState, useEffect } from 'react'
import api from '../../services/api'
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

  useEffect(() => {
    handleData()
  }, [])


 function handleData() {
    let data = []
    let users = []
    api.get('/students').then((response) => {
        data = response.data
        data.map((user) => {
            user['avatar'] = getRandomSvg()
            users.push({ value: user, label: user.name })
        })
    })
    return users
  }

  async function createTeamAndAddStudents(){
      const students = selectedUsers.map((student) => (student.id))
      const createdTeamId = (await api.post('/teams', { name: "Trem bala" })).data
      const addUsers = (await api.post('/students-team', { teamId: createdTeamId, students }))
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
        <button className="button" onClick={() => createTeamAndAddStudents()}>Criar Time</button>
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
