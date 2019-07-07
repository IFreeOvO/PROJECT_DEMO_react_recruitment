import axios from 'axios'
import { getRedirectPath } from '../util'

// 事件名表
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

// 仓库初始数据
const initState = {
  redirectTo: '',
  // isAuth: false,
  msg: '',
  user: '',
  type: ''
}

// reducer
export function user(state = initState, action) {
  console.log('仓库', state, action.payload)
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case LOAD_DATA:
      return { ...state, ...action.payload }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state
  }
}

// 注册成功事件
// function registerSuccess(data) {
//   return {
//     type: REGISTER_SUCCESS,
//     payload: data
//   }
// }

// 登录成功事件
// function loginSuccess(data) {
//   return {
//     type: LOGIN_SUCCESS,
//     payload: data
//   }
// }

// 授权成功事件
function authSuccess(obj) {
  const {pwd, ...data} = obj // 过滤掉密码
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

// 报错事件
function errorMsg(msg) {
  return { type: ERROR_MSG, msg: msg }
}

// 加载用户信息事件
export function loadData(userInfo) {
  return {
    type: 'LOAD_DATA',
    payload: userInfo
  }
}

// 更新用户信息
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

// 登录
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }

  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// 注册
export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名和密码必须输入')
  }

  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }

  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
