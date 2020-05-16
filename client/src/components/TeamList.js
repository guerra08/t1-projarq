import React, { useState, useEffect } from 'react'
import './TeamList.css'
import { Modal, Button } from 'react-bootstrap'
import { TiDelete } from 'react-icons/ti'

import disabledTeam from '../assets/disabledTeam.svg'
import team0 from '../assets/team1.svg'
import team1 from '../assets/team2.svg'
import team2 from '../assets/team3.svg'
import team3 from '../assets/team4.svg'
import evaluate from '../utils/evaluate'

export default function TeamList({ data, disableButtonTeam }) {
  const [showModal, setShowModal] = useState(false)
  const [stateData, setStateData] = useState([])

  const [workingSoftware, setWorkingSoftware] = useState('')
  const [process, setProcess] = useState('')
  const [pitch, setPitch] = useState('')
  const [innovation, setInnovation] = useState('')
  const [teamFormation, setTeamFormation] = useState('')

  useEffect(() => {
    setStateData(data)
  }, [data])

  function getRandomSvg() {
    let vector = [team0, team1, team2, team3]
    return vector[Math.floor(Math.random() * 4)]
  }

  async function handleButton(team) {
    await setShowModal(true)
  }

  const handleClose = () => setShowModal(false)

  async function createEvaluation() {
    // console.log(team)
    await setShowModal(false)
  }

  async function evaluateButton(id, item, number) {
    document.getElementById(id).style.border = '3px solid #5a5a5a'
    item.buttons.map((button) => {
      if (id !== button.id) {
        document.getElementById(button.id).style.border = '0px'
      }
    })
    switch (item.name) {
      case 'Software Funcionando':
        await setWorkingSoftware(number)
        break
      case 'Processo':
        await setProcess(number)
        break
      case 'Pitch':
        await setPitch(number)
        break
      case 'Inovação':
        await setInnovation(number)
        break
      case 'Formação do Time':
        await setTeamFormation(number)
        break
    }
  }

  function handleClick(id) {
    setStateData(
      stateData.filter((team) => {
        // console.log(team)
        return team.id !== id
      })
    )
  }

  return (
    <div>
      {stateData.length === 0 ? (
        <div className="disabledTeam">
          <img src={disabledTeam} alt="disabledTeam"></img>
          <p>Nenhum Time Cadastrado!</p>
        </div>
      ) : (
        <div>
          <ul className="list">
            {stateData.map((team) => (
              <li key={team.id}>
                {!disableButtonTeam ? (
                  <button
                    onClick={() => handleButton(team)}
                    className="listButton"
                  >
                    <div className="insideButton">
                      {/* {console.log(team.avatar)} */}
                      {/* alterar com dados da api */}
                      <img src={getRandomSvg()} alt="team"></img>
                      <div>
                        <p>
                          <strong>{team.name}</strong>
                        </p>
                        <p>
                          Participantes:
                          {team.participants.map((student) => {
                            if (team.participants[0] === student) {
                              return ' ' + student.name
                            }
                            return ', ' + student.name
                          })}
                        </p>

                        <p>
                          Score atual: <strong>{team.score.value}</strong>
                        </p>
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="listButton">
                    <div className="insideButton">
                      <img src={getRandomSvg()} alt="team"></img>
                      <div>
                        <p>
                          <strong>{team.name}</strong>
                        </p>
                        <p>
                          Participantes:
                          {team.participants.map((student) => {
                            if (team.participants[0] === student) {
                              return ' ' + student.name
                            }
                            return ', ' + student.name
                          })}
                        </p>
                        <p>
                          Score atual: <strong>{team.score.value}</strong>
                        </p>
                      </div>
                      <button
                        className="removeTeam"
                        onClick={() => handleClick(team.id)}
                      >
                        <TiDelete size={50} color="#FF3B30" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Modal centered show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Avalie o Time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="ranking">
                {evaluate.map((item) => (
                  <div>
                    <p>{item.name}</p>
                    <div className="item">
                      {item.buttons.map((button) => (
                        <button
                          onClick={() =>
                            evaluateButton(button.id, item, button.number)
                          }
                          id={button.id}
                        >
                          {button.number}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => createEvaluation()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  )
}
