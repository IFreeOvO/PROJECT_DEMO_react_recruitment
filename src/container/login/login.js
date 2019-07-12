import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-form'

@connect(
  state =>state.user,
  {login}
)
@imoocFrom
class Login extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  // handleChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  handleLogin() {
    this.props.login(this.props.state)
  }

  register() {
    this.props.history.push('/register')
  }

  render() {
    return (
      <div>
      {this.props.redirectTo && this.props.redirectTo !== '/login'? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo />
        <WingBlank>
          <List>
          {this.props.msg? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              账号
            </InputItem>
            <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>
              密码
            </InputItem>
          </List>
          <WhiteSpace />

          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
