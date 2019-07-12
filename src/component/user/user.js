import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import { Redirect} from 'react-router-dom'

@connect(state => state.user, {logoutSubmit})
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    const alert = Modal.alert
    alert('退出登录', '确认退出吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        browserCookies.erase('userid')
        this.props.logoutSubmit()

        // // eslint-disable-next-line
        // window.location.href = window.location.href // 刷新页面
        console.log('退出登录')
      } },
    ])
  }

  render() {
    console.log('用户信息', this.props)
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief

    return props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../img/${props.avatar}.png`)}
              alt="头像"
              style={{ width: 50 }}
            />
          }
          title={props.user}
          message={props.type === 'boss'? props.company: null}
        />

        <List renderHeader={()=> '简介' }>
          <Item multipleLine >
          {props.title}
            <Brief>{props.desc}</Brief>
            {props.money? <Brief>薪资：{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo} />
  }
}

export default User
