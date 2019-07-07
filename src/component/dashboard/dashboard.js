import React from 'react'
import { Route,Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'

function Genius() {
  return <h2>Genius</h2>
}

function Msg() {
  return <h2>Msg</h2>
}

function User() {
  return <h2>User</h2>
}

@connect(state => state)
class Dashboard extends React.Component {
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    // 牛人看到的是boss列表  boss看到的是牛人列表
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    console.log('页面', user)
    return (
      <div>
        <NavBar mode='dard' className='fixd-header'>{navList.find(v => v.path===pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=> (
              <Route path={v.path} component={v.component} key={v.path}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
