import csshook from 'css-modules-require-hook/preset' // 要放app之前
import assethook from 'asset-require-hook'
assethook({
  extensions: ['png']
})

import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../src/reducer'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString, renderToNodeStream } from 'react-dom/server' // ssr渲染
import staticPath from '../build/asset-manifest.json'
import App from '../src/app'





const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')

const app = express()

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

// io是全局请求, socket是当前请求
io.on('connection', function(socket) {
  console.log('用户已连接聊天')

  socket.on('sendmsg', function(data) {
    // console.log('收到消息', data)

    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create(
      { chatid, from, to, content: msg, create_time: new Date().getTime() },
      function(err, doc) {
        io.emit('recvmsg', Object.assign({}, doc._doc))
      }
    )

    // 发送全局事件
    // io.emit('recvmsg', data)
  })
})

const userRouter = require('./users')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

// 服务端渲染
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }

  // 有点问题, 先注释掉
//   const store = createStore(reducers, compose(applyMiddleware(thunk)))

//   let context = {}

//   const markup = renderToString(
//     <Provider store={store}>
//       <StaticRouter location={req.url} context={context}>
//         <App />
//       </StaticRouter>
//     </Provider>
//   )

//   const obj = {
//     '/msg': '聊天消息列表',
//     '/boss': '牛人列表'
//   }

//   const pageHTML = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <meta
//       name="viewport"
//       content="width=device-width, initial-scale=1, shrink-to-fit=no"
//     />
//     <meta name="theme-color" content="#000000" />
//     <title>React App</title>
//     <link rel='stylesheet' href='${staticPath['main.css']}'/>
//     <meta name'keywords' content='React,Imooc,聊天,SSR' />
//     <meta name'description' content='${obj[req.url]}' />
//     <meta name'author' content='Imooc' />
//   </head>
//   <body>
//     <noscript>You need to enable JavaScript to run this app.</noscript>
//     <div id="root">${markup}</div>

//     <script src='${staticPath['main.js']}'></script>
//   </body>
// </html>`

//   res.send(pageHTML)

  return res.sendFile(path.resolve('build/index.html'))
})

app.use('/', express.static(path.resolve('build')))

app.get('/', (req, res) => {
  res.send('<h1>欢迎后台</h1>')
})

server.listen(8080, () => {
  console.log('启动成功')
  console.log('http://localhost:8080')
})
