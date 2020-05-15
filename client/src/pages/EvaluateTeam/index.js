import React, { useState, useEffect } from 'react'
import './styles.css'
import TeamList from '../../components/TeamList'

export default function EvaluateTeam() {
  const data = [
    {
      id: 1,
      name: 'Time dos bom',
      participants: [
        {
          name: 'Joao',
        },
        {
          name: 'Bruno',
        },
      ],
    },
    {
      id: 2,
      name: 'Time dos bom',
      participants: [
        {
          name: 'Bernardo',
        },
        {
          name: 'Patricio',
        },
        {
          name: 'Patricio',
        },
      ],
    },
    {
      id: 2,
      name: 'Time dos bom',
      participants: [
        {
          name: 'Bernando',
        },
        {
          name: 'Patricio',
        },
      ],
    },
    {
      id: 2,
      name: 'Time dos bom',
      participants: [
        {
          name: 'Bernando',
        },
        {
          name: 'Patricio',
        },
      ],
    },
  ]

  useEffect(() => {
    // handleData()
  }, [])
  //Fazer isso com os dados da api
  // data.map((team) => {
  //   team['avatar'] = getRandomSvg()
  // })

  return (
    <div className="listContainer">
      <div className="title">Selecione um time para avaliar</div>
      <TeamList disableButtonTeam={false} data={data} />
    </div>
  )
}
