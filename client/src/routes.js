import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import CreateTeam from './pages/CreateTeam'
import EvaluateTeam from './pages/EvaluateTeam'
import UploadStudents from './pages/UploadStudents'
import DeleteTeam from './pages/DeleteTeam'
import RankTeams from './pages/RankTeams'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/create" component={CreateTeam} />
        <Route path="/evaluate" component={EvaluateTeam} />
        <Route path="/upload" component={UploadStudents} />
        <Route path="/delete" component={DeleteTeam} />
        <Route path="/rank" component={RankTeams} />
      </Switch>
    </BrowserRouter>
  )
}
