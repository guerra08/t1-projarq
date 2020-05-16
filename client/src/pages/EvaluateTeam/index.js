import React, { useState, useEffect } from 'react'
import './styles.css'
import TeamList from '../../components/TeamList'
import api from '../../services/api'
import team0 from '../../assets/team1.svg'
import team1 from '../../assets/team2.svg'
import team2 from '../../assets/team3.svg'
import team3 from '../../assets/team4.svg'

export default function EvaluateTeam() {

  const [teams, setTeams] = useState([])

  useEffect(() => {
    handleData()
  }, [])

  function getRandomSvg() {
    let vector = [team0, team1, team2, team3]
    return vector[Math.floor(Math.random() * 4)]
  }

  async function handleData(){
    const data = (await api.get('/teams-complete')).data
    data.map((team) => {
       team['avatar'] = getRandomSvg()
    })

    await setTeams(data)
  }

  return (
    <div className="listContainer">
      <div className="titleEvaluate">Selecione um time para avaliar</div>
      <TeamList disableButtonTeam={false} data={teams} />
    </div>
  )
}
