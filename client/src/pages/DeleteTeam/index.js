import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import TeamList from '../../components/TeamList'
import getRandomSvg from '../../utils/getRandomSvg'
import AccessDenied from '../../components/AccessDenied'
import { checkAccess } from '../../utils/access'

import './styles.css'
import api from '../../services/api'

export default function DeleteTeam() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    handleData()
  }, [])

  async function handleData() {
    const data = (await api.get('/teams-complete')).data
    if (data)
      data.map((team) => {
        team['avatar'] = getRandomSvg('team')
      })
    await setTeams(data)
  }
  if (checkAccess('admins')) {
    return (
      <div>
        <NavBar path="upload" name="Cadastrar Alunos" type={'admins'} />
        <div className="deleteContainer">
          <p className="titleDelete">Times Criados</p>
          <TeamList
            disableButtonTeam={true}
            data={teams}
            deleteRemovesFromDatabase={true}
          />
        </div>
      </div>
    )
  }

  return <AccessDenied />
}
