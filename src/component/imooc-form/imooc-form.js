import React from 'react'

export default function imoocForm(Comp) {
  return class WrapperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        // user: '',
        // pwd: ''
      }
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, val) {
      console.group('高阶组件')
      console.log(key)
      console.log(val)
      console.log(this.state)
      console.groupEnd()
      this.setState({
        [key]: val
      })
    }

    render() {
      return (
        <Comp
          {...this.props}
          handleChange={this.handleChange}
          state={this.state}
        />
      )
    }
  }
}
