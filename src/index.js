import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route } from 'react-router-dom'

import reducers from './reducer'
import './config'

import AuthRoute from './component/authRoute/authRoute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'

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

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Route path="/geniusinfo" component={GeniusInfo} />
        <Route path="/bossinfo" component={BossInfo} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
