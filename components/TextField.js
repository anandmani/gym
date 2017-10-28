import React, { PureComponent } from 'react'
import { TextInput, StyleSheet } from 'react-native'

const dangerColor = '#d9534f'
const errorProps = {
  selectionColor: dangerColor,
  underlineColorAndroid: dangerColor,
  placeholderTextColor: dangerColor
}

export default class TextField extends PureComponent {

  componentDidMount() {
    this.props.refCallback(this.element)
  }

  render() {
    return this.props.error ?
      <TextInput
        {...this.props}
        {...errorProps}
        ref={(element) => this.element = element}
      />
      :
      <TextInput
        {...this.props}
        ref={(element) => this.element = element}
      />
  }
}
