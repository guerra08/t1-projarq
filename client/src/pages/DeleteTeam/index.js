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
      score: 8,
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
      score: 8,
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
      score: 7,
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
      score: 10,
    },
  ]

  return (
    <div className="deleteContainer">
      <p className="title">Times Criados</p>
      <TeamList disableButtonTeam={true} data={data} />
    </div>
  )
}
