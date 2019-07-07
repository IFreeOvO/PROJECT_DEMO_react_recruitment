import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
  null,
  {
    loadData
  }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathName = this.props.location.pathname
    console.log('当前页面', pathName)
    if (publicList.indexOf(pathName) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then(res => {
      console.log(res.data)
      if (res.status === 200) {
        // 是否有登录信息
        if (res.data.code === 0) {
          console.log('有登录信息')
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('/login')
          console.log('没有登录,返回登录页')
        }
      }
    })

    // 是否登录
    // 现在的url地址 login是不需要跳转的

    // 用户的type 身份是牛人还是boss
    // 用户是否完善信息 (选择头像 个人简介)
  }

  render() {
    return <div></div>
  }
}

export default AuthRoute
