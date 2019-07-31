import React from 'react'
import {  Route, Switch } from 'react-router-dom'
import AuthRoute from './component/authRoute/authRoute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component//dashboard/dashboard'
import Chat from './component/chat/chat'

class App extends React.Component {
  render(){
    return (
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    )
  }
}

export default App