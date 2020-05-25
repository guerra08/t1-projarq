import React, { useState, useEffect } from 'react'
import './styles.css'
import { Modal, Button } from 'react-bootstrap'
import { TiDelete } from 'react-icons/ti'
import api from '../../services/api'
import disabledTeam from '../../assets/disabledTeam.svg'
import evaluate from '../../utils/evaluate'

export default function TeamList({
  data,
  disableButtonTeam,
  deleteRemovesFromDatabase,
  whenDataIsUpdated,
}) {
  const [showModal, setShowModal] = useState(false)
  const [teamId, setTeamId] = useState(-1)
  const [stateData, setStateData] = useState([])

  const [workingSoftware, setWorkingSoftware] = useState(0)
  const [process, setProcess] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [innovation, setInnovation] = useState(0)
  const [teamFormation, setTeamFormation] = useState(0)

  useEffect(() => {
    setStateData(data)
  }, [data])

  async function handleButton(team) {
    await setTeamId(team.id)
    await setShowModal(true)
  }

  const handleClose = () => {
    cleanValues()
    setShowModal(false)
  }

  async function cleanValues() {
    await setWorkingSoftware(0)
    await setProcess(0)
    await setPitch(0)
    await setInnovation(0)
    await setTeamFormation(0)
  }

  async function createEvaluation() {
    const res = await api.post('/professors/evaluate', {
      team: teamId,
      professor: localStorage.getItem('userId'),
      working: workingSoftware,
      process,
      pitch,
      innovation,
      team_formation: teamFormation,
    })
    whenDataIsUpdated()
    await setShowModal(false)
  }

  async function evaluateButton(id, item, number) {
    if (
      id === 'button1' || id === 'button6' || id === 'button11' || id === 'button16' || id === 'button21') {
      document.getElementById(id).style.border = '3px solid #730d0d'
    }
    if (
      id === 'button2' || id === 'button7' || id === 'button12' || id === 'button17' || id === 'button22') {
      document.getElementById(id).style.border = '3px solid #a36a00'
    }
    if (
      id === 'button3' || id === 'button8' || id === 'button13' || id === 'button18' || id === 'button23') {
      document.getElementById(id).style.border = '3px solid #d19111'
    }
    if (
      id === 'button4' || id === 'button9' || id === 'button14' || id === 'button19' || id === 'button24') {
      document.getElementById(id).style.border = '3px solid #0a5a0a'
    }
    if (
      id === 'button5' || id === 'button10' || id === 'button15' || id === 'button20' || id === 'button25') {
      document.getElementById(id).style.border = '3px solid #1c4518'
    }

    item.buttons.map((button) => {
      if (id !== button.id) {
        document.getElementById(button.id).style.border = '0'
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

  async function handleClick(id) {
    if (deleteRemovesFromDatabase) {
      const op = await api.delete(`/teams/${id}`)
      console.log(op)
    }
    setStateData(
      stateData.filter((team) => {
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
                        <img src={team.avatar} alt="team"></img>
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
                            Score atual: <strong>{team.score}</strong>
                          </p>
                        </div>
                      </div>
                    </button>
                  ) : (
                      <div className="listButton2">
                        <div className="insideButton">
                          <img src={team.avatar} alt="team"></img>
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
                              Score atual: <strong>{team.score}</strong>
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
