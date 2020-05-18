import React, {useEffect, useState} from 'react'
import NavBar from '../../components/NavBar'
import TeamList from '../../components/TeamList'
import getRandomSvg from '../../utils/getRandomSvg'

import './styles.css'
import api from "../../services/api";

export default function DeleteTeam() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    handleData()
  }, [])

  async function handleData() {
    const data = (await api.get('/teams-complete')).data
    data.map((team) => {
      team['avatar'] = getRandomSvg('team')
    })
    await setTeams(data)
  }

  return (
    <div>
      <NavBar path="upload" name="Cadastrar Alunos" />
      <div className="deleteContainer">
        <p className="titleDelete">Times Criados</p>
        <TeamList disableButtonTeam={true} data={teams} deleteRemovesFromDatabase={true}/>
      </div>
    </div>
  )
}
