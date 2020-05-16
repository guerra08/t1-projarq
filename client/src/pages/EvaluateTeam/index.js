import React, { useState, useEffect } from 'react'
import './styles.css'
import { Modal, Button } from 'react-bootstrap'
import api from '../../services/api'

import disabledTeam from '../../assets/disabledTeam.svg'
import team0 from '../../assets/team1.svg'
import team1 from '../../assets/team2.svg'
import team2 from '../../assets/team3.svg'
import team3 from '../../assets/team4.svg'
import evaluate from '../../utils/evaluate'

export default function EvaluateTeam() {
  const [showModal, setShowModal] = useState(false)
  const [teams, setTeams] = useState([])

  useEffect(() => {
    getTeams()
  }, [])

  async function getTeams(){
    await setTeams((await api.get('/valid-teams')).data)
  }

  function getRandomSvg() {
    let vector = [team0, team1, team2, team3]
    return vector[Math.floor(Math.random() * 4)]
  }

  async function handleButton() {
    await setShowModal(true)
  }

  const handleClose = () => setShowModal(false)

  async function createEvaluation() {
    await setShowModal(false)
  }

  function evaluateButton(number, item) {
    document.getElementById(number).style.border = '3px solid #5a5a5a'
    item.buttons.map((button) => {
      if (number !== button.id) {
        document.getElementById(button.id).style.border = '0px'
      }
    })
  }

  if(teams.length > 0){
    return (
        <div className="listContainer">
          <div className="title">Selecione um time para avaliar</div>
          <div>
            <ul className="list">
              {teams.map((team) => (
                  <li key={team.id}>
                    <button onClick={() => handleButton()} className="listButton">
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
                            Score atual: <strong>8</strong>
                          </p>
                        </div>
                      </div>
                    </button>
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
                                  onClick={() => evaluateButton(button.id, item)}
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
        </div>
    )
  }

  return (
      <div>
        <p>Placeholder</p>
      </div>
  )
}
