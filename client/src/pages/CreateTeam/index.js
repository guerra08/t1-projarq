import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar'
import { checkAccess } from '../../utils/access'
import api from '../../services/api'
import './styles.css'
import Select from 'react-select'
import { Alert } from 'react-bootstrap'
import { TiDelete } from 'react-icons/ti'
import { FaThumbsUp } from 'react-icons/fa'
import AccessDenied from '../../components/AccessDenied'

import disabledSvg from '../../assets/disabled.svg'
import getRandomSvg from '../../utils/getRandomSvg'

export default function CreateTeam() {
  const [data, setData] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [teamName, setTeamName] = useState('')
  const [hasAccess, setHasAccess] = useState(-1)
  const [hasInserted, setHasInserted] = useState(false)
  const [hasTeam, setHasTeam] = useState(false)
  const [myTeam, setMyTeam] = useState({})

  useEffect(() => {
    handleDataAndAccess()
  }, [])

  async function handleDataAndAccess() {
    if (checkAccess('students')) {
      await setHasAccess(1)
      const team = await api.get('/students/team', {
        headers: { Authorization: localStorage.getItem('userId') },
      })
      if (team.status === 200) {
        await setHasTeam(true)
        await setMyTeam(team.data)
      } else {
        let data = (await api.get('/students-noteam')).data
        let users = []

        data.map((user) => {
          user['avatar'] = getRandomSvg('avatar')
          users.push({ value: user, label: user.name })
        })
        await setData(users)
      }
    } else {
      await setHasAccess(0)
    }
  }

  async function createTeamAndAddStudents() {
    const studentId = localStorage.getItem('userId')
    const students = selectedUsers.map((student) => student.id)
    const createdTeamId = (
      await api.post('/teams', { name: teamName, created_by: studentId })
    ).data.id
    const addUsers = await api.post('/students-team', {
      teamId: createdTeamId,
      students,
    })
    if (addUsers.status === 201) {
      await setHasInserted(true)
      setTimeout(() => {
        handleDataAndAccess();
      }, 2000)
    }
  }

  async function handleChange(selected) {
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
      let baseCourse = selectedUsers[0].course_id
      for (let i = 1; i < selectedUsers.length; i++) {
        if (selectedUsers[i].course_id !== baseCourse) {
          bool = true
          return bool
        }
      }
    }
    return bool
  }

  async function handleClick(userId) {
    await setSelectedUsers(selectedUsers.filter((user) => user.id !== userId))
  }

  async function handleInputSelect(e) {
    await setTeamName(e.target.value)
  }

  if (hasAccess === 1) {
    if (hasTeam) {
      return (
        <>
          <NavBar type={localStorage.getItem('userType')}></NavBar>
          <div className="alreadyCreated">
            {myTeam.created_by ===
            Number.parseInt(localStorage.getItem('userId')) ? (
              <p className="createdTitle">Você já cadastrou um time!</p>
            ) : (
              <p className="createdTitle">Você já foi cadastrado em um time!</p>
            )}
            <FaThumbsUp size={80} color="#4CD964" />
          </div>
        </>
      )
    }
    return (
      <>
        <NavBar type={localStorage.getItem('userType')}></NavBar>
        <div className="teamContainer">
          <div className="selectContainer">
            <p className="titleCreate">Sugira um time para a hackatona</p>
            <input
              onChange={(e) => handleInputSelect(e)}
              className="selectInput"
              placeholder="Nome do Time"
            ></input>
            <div className="select">
              {selectedUsers.length > 4 ? (
                <Alert variant="danger">Equipe Cheia!</Alert>
              ) : (
                <Select
                  onChange={(selected) => handleChange(selected)}
                  options={data}
                  placeholder="Selecione um Aluno"
                />
              )}
            </div>
          </div>
          {selectedUsers.length === 0 ? (
            <div className="disabledSvg">
              <img src={disabledSvg} alt="disabled"></img>
              <p>Você não sugeriu um time ainda!</p>
            </div>
          ) : (
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
          )}

          {hasInserted ? (
            <button className="createdTeam" disabled="true">
              Time Criado
            </button>
          ) : changeButton() ? (
            <button
              className="button"
              onClick={() => createTeamAndAddStudents()}
            >
              Criar Time
            </button>
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
      </>
    )
  }else if(hasAccess === 0){
    return <AccessDenied />
  }
  else if(hasAccess === -1){
    return(
        <>
        </>
    )
  }
}
