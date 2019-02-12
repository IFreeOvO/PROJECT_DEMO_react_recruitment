import React, { Component } from 'react';
import { Button, List } from 'antd-mobile'
// import { createStore } from 'redux'
// import 'antd-mobile/dist/antd-mobile.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [
        {
          id: 1,
          name: '达到'
        },
        {
          id: 2,
          name: '多少的大'
        },
        {
          id: 3,
          name: '的深V'
        },
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Button type='primary'>按钮</Button>
        <List renderHeader={() => '列表'}>
          {
            this.state.list.map(v => {
              return (
                <List.Item key={v.id}>
                  {v.name}
                </List.Item>
              )
            })
          }
          
        </List>
      </div>
    );
  }
}

export default App;
