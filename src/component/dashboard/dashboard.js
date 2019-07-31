import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import Msg from '../../component/msg/msg'
import QueueAnim from 'rc-queue-anim'

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      setTimeout(() => {
        this.props.getMsgList()
        this.props.recvMsg()
      }, 0)
    }
  }

  render() {
    const { pathname } = this.props.location
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
    const page = navList.find(v => v.path === pathname)
    return page?(
      <div>
        <NavBar mode="dard" className="fixd-header" style={{ zIndex: 10 }}>
          {page.title}
        </NavBar>
        <div
          style={{ marginTop: 45, height: '100%', paddingBottom: 50 }}
          className="overflowy"
        >
        
            <QueueAnim type='scaleX' duration={800}>
              <Route key={page.path} path={page.path} component={page.component}></Route>
            </QueueAnim>
      
        </div>
        <NavLinkBar data={navList} />
      </div>
    ): <Redirect to='login'></Redirect>
  }
}

export default Dashboard
