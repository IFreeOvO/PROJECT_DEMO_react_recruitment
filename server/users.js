const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0, '__v': 0} // 用于不让后台返回密码和版本号

Router.get('/list', function(req, res) {
  // User.remove({}, function(e,d){}) // 删除所有用户数据
  const {type} = req.query

  User.find({type}, _filter, function(err, doc) {
    return res.json({code:0,data: doc})
  })
})

// 更新用户信息
Router.post('/update', function(req, res) {
  const { userid } = req.cookies
  // 未授权就报错
  if(!userid) {
    return res.json({code: 1})
  }
  const body = req.body
  // 查询并更新
  User.findByIdAndUpdate(userid, body, function(err,doc){
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })  
})

// 登录
Router.post('/login', function(req, res) {
  const {user, pwd } = req.body
  // pwd:0 用来使返回值不含密码
  User.findOne({user, pwd:md5Pwd(pwd)}, {pwd: 0}, function(err, doc) {
    if(!doc) {
      return res.json({code:1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id) // 记录登录状态
    return res.json({code: 0, data: doc})
  })
})

// 注册
Router.post('/register', function(req, res) {
  const {user, pwd, type } = req.body
  User.findOne({user}, function(err, doc) {
    if(doc) {
      return res.json({code:1, msg: '用户名重复'})
    }

    // 数据存到数据库(可以拿到id)
    const userModel = new User({user, pwd:md5Pwd(pwd), type })
    userModel.save(function(e, d) {
      if(e) {
        return res.json({code:1, msg: '后端出错了'})
      }
      const {user, type, _id} = d 
      res.cookie('userid', _id) // 记录登录状态
      return res.json({code:0, data: {user, type, _id}})
    })

    // 数据存到数据库(拿不到用户id)
    // User.create({user, pwd:md5Pwd(pwd), type }, function(err, doc) {
    //   if(err) {
    //     return res.json({code:1, msg: '后端出错了'})
    //   }

    //   return res.json({code:0})
    // })
  })
})

Router.get('/info', (req, res) => {
  const {userid} = req.cookies
  // 如果没有登录
  if(!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter,function(err, doc) {
    if(err) {
      return res.json({code:1, msg: '后端出错了'})
    }
    if(doc) {
      return res.json({code: 0, data: doc})
    }
  })
  
})

function md5Pwd(pwd) {
  const salt = 'imooc_is_good_3957x8xza6!@#IUHJh~~'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router