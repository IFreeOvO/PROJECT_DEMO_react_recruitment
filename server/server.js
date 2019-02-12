const express = require('express')
const mongoose = require('mongoose')

const app = express()

// 连接数据库
const DB_URL ='mongodb://127.0.0.1:27017/chatRoomReact'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', ()=> {
  console.log('数据库连接成功')
})

// mongo里有文档,字段的概念
const User = mongoose.model('user', new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
}))

// 创建数据
// User.create({
//   user: 'admin',
//   age: '1'
// }, (err, doc) => {
//   if(!err) {
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

User.update({
  user: 'hh'
}, {'$set': {age: 6}}, (err, doc) => {
  console.log(doc)
})

// User.remove({
//   age: 0
// }, (err, doc) => {
//   console.log(doc)
// })

app.get('/', (req, res) => {
  res.send('<h1>欢迎后台</h1>')
})

app.get('/data', (req, res) => {
  // 查找所有数据
  User.find({}, (err, doc) => {
    return res.json(doc)
  })
})

app.listen(8080, () => {
  console.log('启动成功')
  console.log('http://localhost:8080')
})