import React from 'react'
import Logo from '../../component/logo/logo'
import {
  Radio,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import { connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { register} from '../../redux/user.redux'
import '../../index.css'

@connect(
  state => state.user,
  {register}
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd: '',
      repeatpwd: '',
      type: 'genius' // 或者boss
    }

    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
    
  }

  handleRegister() {
    console.log('注册页',this.state)
    console.log('注册页',this.props)
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo />
        <List>
        {this.props.msg? <p className='error-msg'>{this.props.msg}</p> : null}
          <InputItem onChange ={v=>this.handleChange('user',v)}>账号</InputItem>
          <InputItem  type='password' onChange ={v=>this.handleChange('pwd',v)}>密码</InputItem>
          <InputItem  type='password' onChange ={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
        </List>
        <WhiteSpace />
        <List>
          <RadioItem checked={this.state.type === 'genius'} onChange ={()=>this.handleChange('type','genius')}>牛人</RadioItem>
          <RadioItem checked={this.state.type === 'boss' } onChange ={()=>this.handleChange('type','boss')}>Boss</RadioItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={this.handleRegister}>注册</Button>
      </div>
    )
  }
}

export default Register
