import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import CreateTeam from './pages/CreateTeam'
import EvaluateTeam from './pages/EvaluateTeam'
import UploadTeam from './pages/UploadTeam'
import DeleteTeam from './pages/DeleteTeam'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={CreateTeam} />
        <Route path="/evaluate" component={EvaluateTeam} />
        <Route path="/upload" component={UploadTeam} />
        <Route path="/delete" component={DeleteTeam} />
      </Switch>
    </BrowserRouter>
  )
}
