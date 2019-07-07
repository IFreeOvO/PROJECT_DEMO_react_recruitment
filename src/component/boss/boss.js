import React from 'react'
import { connect } from 'react-redux';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  {
    getUserList
  }
)
class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    console.log('牛人列表', this.props.userlist)
    const Header = Card.Header
    const Body = Card.Body

    return (
      <WingBlank>
      <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v =>
          v.avatar ? (
            <Card key={v._id}>
              <Header
                title={v.title}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Body>{v.desc.split('\n').map(v=> (
                <span key={v}>{v}</span>
              ))}</Body>
            </Card>
          ) : null
        )}
      </WingBlank>
    )
  }
}

export default Boss
