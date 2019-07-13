import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
  state => state.chat
)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired // 设为必传属性
  }

  render() {
    // 牛人看到的是boss按钮  boss看到的是牛人按钮
    const navList = this.props.data.filter(v => !v.hide)  // 过滤掉false项
    const { pathname } = this.props.location
    console.log(navList)
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            badge={v.path=== '/msg' ? this.props.unread : 0}
            title={v.text}
            key={v.path}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          />
        ))}
      </TabBar>
    )
  }
}

export default NavLinkBar
