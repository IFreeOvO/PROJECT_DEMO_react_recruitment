import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
    console.log(this.state)
  }

  render() {
    // 解决重定向路由重复警告
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    //  {this.props.redirectTo? (<Redirect to={this.props.redirectTo}></Redirect>) :null}
    return (
      <div>
      {redirect && redirect !== path? (<Redirect to={this.props.redirectTo}></Redirect>) :null}
        <NavBar mode="dark">BOSS完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({
              avatar: imgname
            })
          }}
        />
        <InputItem onChange={v => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.onChange('money', v)}>
          薪资范围
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          autoHeight
          rows={3}
          title="职位要求"
        />
        <Button
          type="primary"
          onClick={() => {
            this.props.update(this.state)
          }}
        >
          保存
        </Button>
      </div>
    )
  }
}

export default BossInfo
