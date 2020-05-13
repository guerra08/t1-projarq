import React from 'react'
import User from '../../components/User'
import './styles.css'

const data = [
  {
    id: 1,
    name: 'Bruno Guerra',
    code: '123456789',
    email: 'gguerrabruno@outlook.com',
    phone: '998877665544',
    course: 1,
  },
  {
    id: 2,
    name: 'Osvaldo',
    code: '123456789',
    email: 'gguerrabruno@outlook.com',
    phone: '998877665544',
    course: 1,
  },
  {
    id: 3,
    name: 'Osvaldo',
    code: '123456789',
    email: 'gguerrabruno@outlook.com',
    phone: '998877665544',
    course: 1,
  },
  {
    id: 4,
    name: 'Osvaldo',
    code: '123456789',
    email: 'gguerrabruno@outlook.com',
    phone: '998877665544',
    course: 1,
  },
  {
    id: 4,
    name: 'Osvaldo',
    code: '123456789',
    email: 'gguerrabruno@outlook.com',
    phone: '998877665544',
    course: 1,
  },
]

export default function CreateTeam() {
  return (
    <div className="teamContainer">
      <select>Gambis</select>
      <User data={data} />
      <button className="button">Criar Time</button>
    </div>
  )
}
