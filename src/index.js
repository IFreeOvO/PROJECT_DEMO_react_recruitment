import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import reducers from './reducer'
import './config'
import './index.css'

import AuthRoute from './component/authRoute/authRoute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component//dashboard/dashboard'
import Chat from './component/chat/chat'

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    reduxDevtools
  )
)

// boss genius me msg 4个页面有相同的部分
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
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
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
