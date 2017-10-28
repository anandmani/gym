import React, { PureComponent } from 'react'
import { TextInput, StyleSheet } from 'react-native'

const dangerColor = '#d9534f'
const errorProps = {
  selectionColor: dangerColor,
  underlineColorAndroid: dangerColor,
  placeholderTextColor: dangerColor
}

export default class TextField extends PureComponent {
  render() {
    return this.props.error ?
      <TextInput
        {...this.props}
        {...errorProps}
      />
      :
      <TextInput
        {...this.props}
      />
  }
}
