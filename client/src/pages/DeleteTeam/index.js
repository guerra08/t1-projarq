import React from 'react'
import { Navbar } from 'react-bootstrap'
import { GrUserAdmin } from 'react-icons/gr'

import TeamList from '../../components/TeamList'
import team0 from '../../assets/team1.svg'
import team1 from '../../assets/team2.svg'
import team2 from '../../assets/team3.svg'
import team3 from '../../assets/team4.svg'

import './styles.css'
import { Link } from 'react-router-dom'

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

  data.map((team) => {
    team['avatar'] = getRandomSvg()
  })

  function getRandomSvg() {
    let vector = [team0, team1, team2, team3]
    return vector[Math.floor(Math.random() * 4)]
  }

  return (
    <div>
      <Navbar fixed="top" expand="lg" variant="light">
        <GrUserAdmin size={30} className="icon" />
        <Link className="link" to="/upload">
          Upload
        </Link>
      </Navbar>
      {/* </Container> */}
      <div className="deleteContainer">
        <p className="titleDelete">Times Criados</p>
        <TeamList disableButtonTeam={true} data={data} />
      </div>
    </div>
  )
}
