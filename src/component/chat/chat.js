import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'
import { getChatId } from '../../util'

// import io from 'socket.io-client'
// io('ws://localhost:8080')

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '', msg: [] }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    // socket.on('recvmsg', data => {
    //   console.log('收到', data)
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }

  componentWillUnmount() {
    // 标记已读
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  fixCarousel() {
    // 解决grid行数不对的bug, antd官方的bug
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit() {
    console.log('发送', this.state)
    // socket.emit('sendmsg', {text: this.state.text})
    // console.log(this.props)
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '', showEmoji: false })
  }

  render() {
    const emoji = '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺ 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠'
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }))
    console.log(emoji)
    // console.log(this.props)
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    // 如果没找到userid,  比如路由参数没传的情况
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid)

    return (
      <div id="chat-page">
        <NavBar
          className="fixd-header"
          style={{ zIndex: 10 }}
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>

        <div className="overflowy" style={{ marginTop: 45, paddingBottom: 45 }}>
          <QueueAnim delay={100} >
            {chatmsg.map(v => {
              const avatar = require(`../img/${users[v.from].avatar}.png`)
              return v.from === userid ? (
                <List key={v._id}>
                  <Item thumb={avatar}>{v.content}</Item>
                </List>
              ) : (
                <List key={v._id}>
                  <Item
                    className="chat-me"
                    extra={<img src={avatar} alt="头像" />}
                  >
                    {v.content}
                  </Item>
                </List>
              )
            })}
          </QueueAnim>
        </div>

        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({ text: v })
              }}
              extra={
                <div>
                  <span
                    role="img"
                    aria-label="表情"
                    style={{
                      marginRight: 15,
                      height: 30,
                      display: 'inline-block'
                    }}
                    onClick={() => {
                      this.setState({ showEmoji: !this.state.showEmoji })
                      this.fixCarousel()
                    }}
                  >
                    😃
                  </span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Chat
