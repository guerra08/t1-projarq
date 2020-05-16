import React, { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FiUpload } from 'react-icons/fi'
import { Alert } from 'react-bootstrap'
import api from '../../services/api'

import './styles.css'

import avatar0 from '../../assets/avatar0.svg'
import avatar1 from '../../assets/avatar1.svg'
import avatar2 from '../../assets/avatar2.svg'
import avatar3 from '../../assets/avatar3.svg'
import avatar4 from '../../assets/avatar4.svg'

export default function UploadStudents() {

  const [students, setStudents] = useState([])
  const [hasInserted, setHasInserted] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

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
    try{
      await api.post('/upload/create-students', students)
      await setHasInserted(true)
    }catch (e) {
      await setShowAlert(true)
    }
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
      <div className="updateContainer">
        {
          (!hasInserted) ?
              <>
                <input
                    className="inputButton"
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => handleChange(e)}
                ></input>
                <label htmlFor="file">
                  <FiUpload size={30}/>
                  <span>
                    Escolha um arquivo
                  </span>
                </label>
              </>
            : <></>
        }
        <div className="inside">
          <ul className="listUpload">
            {students.length === 0 ? (
              <></>
            ) : (
              students.map((student) => (
                <li className="l">
                  <div key={student.id} className="insideButton">
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
          ) : (hasInserted) ? (
              <Alert variant="success">Alunos cadastrados!</Alert>
          ) : (
          (showAlert) ? (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible={true}>Erro ao cadastrar alunos!</Alert>
          ) :
          (
            <button onClick={() => handleButtonClick()} className="button">
              Adicionar
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
