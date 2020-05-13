import React from 'react'
import './styles.css'

import avatar0 from '../../assets/avatar0.svg'
import avatar1 from '../../assets/avatar1.svg'
import avatar2 from '../../assets/avatar2.svg'
import avatar3 from '../../assets/avatar3.svg'
import avatar4 from '../../assets/avatar4.svg'

function getRandomSvg() {
  let vector = [avatar0, avatar1, avatar2, avatar3, avatar4]
  return vector[Math.floor(Math.random() * 5)]
}

export default function User({ data }) {
  return (
    <div className="userContainer">
      {data.map((user) => (
        <div key={user.id} className="user">
          <img alt="img" src={getRandomSvg()}></img>
          <p>{user.name}</p>
          <p>{user.course}</p>
        </div>
      ))}
    </div>
  )
}
