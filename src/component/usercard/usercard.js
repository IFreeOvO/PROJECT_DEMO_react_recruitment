import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired // 设为必传属性
  }

  render(){
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
              <Body>
              {v.type==='boss'? <div>公司：{v.company}</div> : null }
              {v.desc.split('\n').map(v=> (
                <span key={v}>{v}</span>
              ))}
              {v.type==='boss'? <div>招聘薪资：{v.money}</div> : null }
              </Body>
            </Card>
          ) : null
        )}
      </WingBlank>
    )
  }
}

export default UserCard