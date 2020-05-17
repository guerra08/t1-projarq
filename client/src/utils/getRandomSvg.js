import React from 'react'

import team0 from '../assets/team1.svg'
import team1 from '../assets/team2.svg'
import team2 from '../assets/team3.svg'
import team3 from '../assets/team4.svg'
import avatar0 from '../assets/avatar0.svg'
import avatar1 from '../assets/avatar1.svg'
import avatar2 from '../assets/avatar2.svg'
import avatar3 from '../assets/avatar3.svg'
import avatar4 from '../assets/avatar4.svg'

export default function getRandomSvg(type) {
  console.log(type)
  if (type === 'avatar') {
    let vector = [avatar0, avatar1, avatar2, avatar3, avatar4]
    return vector[Math.floor(Math.random() * 5)]
  } else {
    let vector = [team0, team1, team2, team3]
    return vector[Math.floor(Math.random() * 4)]
  }
}
