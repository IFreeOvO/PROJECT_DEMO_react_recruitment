import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

import reducers from './reducer'
import './config'
import './index.css'

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
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
