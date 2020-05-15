import React from 'react'
import TeamList from '../../components/TeamList'
import './styles.css'

export default function DeleteTeam() {
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
      name: 'Time dos Meus',
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
      id: 3,
      name: 'Time dos Ruim',
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
      id: 4,
      name: 'Time dos Guri',
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

  return (
    <div className="deleteContainer">
      <p className="title">Times Criados</p>
      <TeamList disableButtonTeam={true} data={data} />
    </div>
  )
}
