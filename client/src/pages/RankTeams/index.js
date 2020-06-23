import React, { useState, useEffect } from 'react'

import './styles.css'
import TeamList from '../../components/TeamList'
import api from '../../services/api'
import getRandomSvg from '../../utils/getRandomSvg'

export default function RankTeams() {
  const [teams, setTeams] = useState([])


  useEffect(() => {
    handleData()
  }, [])


  async function handleData() {
    const data = (await api.get('/teams-complete?filterScore=desc')).data
    data.map((team) => {
      team['avatar'] = getRandomSvg('team')
    })

    await setTeams(data)
  }

  return (
    <>
      <div className="listContainer">
        <div className="titleEvaluate">Ranking dos Times</div>
        <TeamList
          disableButtonTeam={true}
          data={teams}
          deleteRemovesFromDatabase={false}
          whenDataIsUpdated={handleData}
          ranked={true}
        />
      </div>
    </>
  )
}
