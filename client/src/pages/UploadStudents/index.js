import React, { useState } from 'react'

import './styles.css'

import avatar0 from '../../assets/avatar0.svg'
import avatar1 from '../../assets/avatar1.svg'
import avatar2 from '../../assets/avatar2.svg'
import avatar3 from '../../assets/avatar3.svg'
import avatar4 from '../../assets/avatar4.svg'
import disabledSvg from '../../assets/disabled.svg'

export default function UploadStudents() {
  const [students, setStudents] = useState([])
  //not working
  function handleChange(e) {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = async function () {
      // console.log(JSON.parse(reader.result)[0])
      await setStudents([JSON.parse(reader.result).data])
    }
    reader.readAsText(file)
  }

  function getRandomSvg() {
    let vector = [avatar0, avatar1, avatar2, avatar3, avatar4]
    return vector[Math.floor(Math.random() * 4)]
  }

  return (
    <div>
      <p>Escolha um arquivo</p>
      <div className="updateContainer">
        <input
          className="inputButton"
          type="file"
          name="file"
          onChange={(e) => handleChange(e)}
        ></input>
        <ul className="listUpload">
          {students.length === 0 ? (
            <> </>
          ) : (
            students[0].map((student) => (
              <li className="l" key={student.id}>
                <div className="insideButton">
                  {/* {console.log(team.avatar)} */}
                  {/* alterar com dados da api */}
                  <img src={getRandomSvg()} alt="team"></img>
                  <div>
                    <p>
                      <strong>{student.name}</strong>
                    </p>
                    <p>{student.course_name}</p>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
