import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import CreateTeam from './pages/CreateTeam'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/main" component={CreateTeam} />
      </Switch>
    </BrowserRouter>
  )
}
