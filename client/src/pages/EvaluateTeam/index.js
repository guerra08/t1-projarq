import React, { useState, useEffect } from 'react'
import './styles.css'
import TeamList from '../../components/TeamList'
import api from '../../services/api'

export default function EvaluateTeam() {

  const [teams, setTeams] = useState([])

  useEffect(() => {
    handleData()
  }, [])

  async function handleData(){
    const data = (await api.get('/teams-complete')).data
    //data.map((team) => {
       //team['avatar'] = getRandomSvg()
    //})

    await setTeams(data)
  }

  return (
    <div className="listContainer">
      <div className="titleEvaluate">Selecione um time para avaliar</div>
      <TeamList disableButtonTeam={false} data={teams} />
    </div>
  )
}
