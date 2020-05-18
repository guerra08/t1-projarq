import React, { useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FiUpload } from 'react-icons/fi'
import { Alert } from 'react-bootstrap'
import NavBar from '../../components/NavBar'

import api from '../../services/api'
import {checkAccess} from '../../utils/access'
import './styles.css'

import getRandomSvg from '../../utils/getRandomSvg'

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

  async function handleButtonClick() {
    try {
      await api.post('/upload/create-students', students)
      await setHasInserted(true)
    } catch (e) {
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

  if(checkAccess("admins")){
    return (
      <div>
        <NavBar path="delete" name="Deletar Times" />
        <div className="updateContainer">
          {!hasInserted ? (
            <>
              <input
                className="inputButton"
                type="file"
                name="file"
                id="file"
                onChange={(e) => handleChange(e)}
              ></input>
              <label htmlFor="file">
                <FiUpload size={30} />
                <span>Escolha um arquivo</span>
              </label>
            </>
          ) : (
            <></>
          )}
          <div className="inside">
            <ul className="listUpload">
              {students.length === 0 ? (
                <></>
              ) : (
                students.map((student) => (
                  <li className="l">
                    <div key={student.id} className="insideButton">
                      <img src={getRandomSvg('avatar')} alt="team"></img>
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
            ) : hasInserted ? (
              <Alert variant="success">Alunos cadastrados!</Alert>
            ) : showAlert ? (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible={true}
              >
                Erro ao cadastrar alunos!
              </Alert>
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
  return(
    <div>
      <p>Acesso negado!</p>
    </div>
  )
}
