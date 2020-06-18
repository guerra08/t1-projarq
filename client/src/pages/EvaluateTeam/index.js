import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar'
import { checkAccess } from '../../utils/access'
import AccessDenied from '../../components/AccessDenied'
import './styles.css'
import TeamList from '../../components/TeamList'
import api from '../../services/api'
import getRandomSvg from '../../utils/getRandomSvg'

export default function EvaluateTeam() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    handleData()
  }, [])

  async function handleData() {
    const data = (await api.get('/teams-complete?filterScore=desc')).data
    if (data)
      data.map((team) => {
        team['avatar'] = getRandomSvg('team')
      })

    await setTeams(data)
  }

  if (checkAccess('professors')) {
    return (
      <>
        <NavBar type={localStorage.getItem('userType')} />
        <div className="listContainer">
          <div className="titleEvaluate">Selecione um time para avaliar</div>
          <TeamList
            disableButtonTeam={false}
            data={teams}
            deleteRemovesFromDatabase={false}
            whenDataIsUpdated={handleData}
          />
        </div>
      </>
    )
  }
  return <AccessDenied />
}
