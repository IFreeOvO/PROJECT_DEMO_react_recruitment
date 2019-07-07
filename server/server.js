const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./users')

const app = express()
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


app.listen(8080, () => {
  console.log('启动成功')
  console.log('http://localhost:8080')
})