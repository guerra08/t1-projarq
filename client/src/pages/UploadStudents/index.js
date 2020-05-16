import React, { useState } from 'react'
import { TiDelete } from 'react-icons/ti'

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
      console.log(JSON.parse(reader.result))
      await setStudents(JSON.parse(reader.result))
    }
    reader.readAsText(file)
  }

  function getRandomSvg() {
    let vector = [avatar0, avatar1, avatar2, avatar3, avatar4]
    return vector[Math.floor(Math.random() * 4)]
  }

  async function handleButtonClick() {
    return 'oi'
  }

  async function handleDeleteButton(c) {
    await setStudents(
      students.filter((student) => {
        return student.code !== c
      })
    )
  }

  return (
    <div>
      {/* <p className="uploadTitle">Escolha um arquivo para adicionar alunos</p> */}
      <div className="updateContainer">
        <input
          className="inputButton"
          type="file"
          name="file"
          onChange={(e) => handleChange(e)}
        ></input>
        <div className="inside">
          <ul className="listUpload">
            {students.length === 0 ? (
              // <div className="disabled">
              //   <img src={disabledSvg} alt="disabled"></img>
              //   <p>Nenhum aluno foi adicionado!</p>
              // </div>
              <></>
            ) : (
              students.map((student) => (
                <li className="l">
                  <div key={student.id} className="insideButton">
                    {/* {console.log(team.avatar)} */}
                    {/* alterar com dados da api */}
                    <img src={getRandomSvg()} alt="team"></img>
                    <div>
                      <p>
                        <strong>{student.name}</strong>
                      </p>
                      <p>Matrícula: {student.code}</p>
                      <p>Telefone: {student.phone}</p>
                      <p>Email: {student.email}</p>
                    </div>
                    <button
                      className="removeTeam"
                      onClick={() => handleDeleteButton(student.code)}
                    >
                      <TiDelete size={50} color="#FF3B30" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
          {students.length === 0 ? (
            <></>
          ) : (
            <button onClick={() => handleButtonClick()} className="button">
              Adicionar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
