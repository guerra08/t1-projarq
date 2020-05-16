import React, { useState } from 'react'

import './styles.css'

export default function UploadStudents() {
  const [students, setStudents] = useState([])
  //not working
  function handleChange(e) {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = async function () {
      // console.log()
      await setStudents([JSON.parse(reader.result)])
    }
    reader.readAsText(file)
  }

  return (
    <div className="updateContainer">
      {console.log(students)}
      <input type="file" name="file" onChange={(e) => handleChange(e)}></input>
      <ul>
        {students.map((student) => (
          <li>
            <p>{student.name}</p>
            <p>{student.course}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
