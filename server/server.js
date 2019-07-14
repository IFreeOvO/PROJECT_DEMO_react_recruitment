const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat')

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

// mongo里有文档,字段的概念
// const User = mongoose.model('user', new mongoose.Schema({
//   user: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   }
// }))

app.get('/', (req, res) => {
  res.send('<h1>欢迎后台</h1>')
})

server.listen(8080, () => {
  console.log('启动成功')
  console.log('http://localhost:8080')
})
